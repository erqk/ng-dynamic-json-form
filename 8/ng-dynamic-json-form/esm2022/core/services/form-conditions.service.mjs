import { Injectable, inject } from '@angular/core';
import { Observable, distinctUntilChanged, filter, from, mergeMap, of, startWith, tap, } from 'rxjs';
import { ConditionsActionEnum, } from '../models';
import { evaluateConditionsStatements } from '../utilities/evaluate-conditions-statements';
import { getControlAndValuePath } from '../utilities/get-control-and-value-path';
import { getValueInObject } from '../utilities/get-value-in-object';
import { FormValidationService } from './form-validation.service';
import { GlobalVariableService } from './global-variable.service';
import * as i0 from "@angular/core";
class FormConditionsService {
    constructor() {
        this._globalVariableService = inject(GlobalVariableService);
        this._formValidationService = inject(FormValidationService);
    }
    /**Listen to the controls that specified in `conditions` to trigger the `targetControl` status and validators
     * @param form The root form
     * @param configs The JSON data
     */
    listenConditions$() {
        const configs = this._globalVariableService.rootConfigs;
        const form = this._globalVariableService.rootForm;
        if (!configs.length || !form || typeof window === 'undefined') {
            return of(null);
        }
        const controls = this._getPathsOfControlsToListen(configs)
            .map((x) => form.get(x))
            .filter(Boolean);
        const configsWithConditions = this._configsWithConditions(configs);
        const valueChanges$ = (c) => c.valueChanges.pipe(startWith(c.value), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
        // Should avoid using debounceTime() here, as it will cause flickers when toggle the visibility
        );
        return from(controls).pipe(mergeMap((x) => valueChanges$(x)), tap(() => this._handleValueChanges(configsWithConditions)));
    }
    _handleValueChanges(data) {
        const form = this._globalVariableService.rootForm;
        if (!form)
            return;
        for (const key in data) {
            const control = form.get(key);
            if (!control)
                continue;
            const config = data[key];
            const conditions = config.conditions;
            this._executeCustomActions(conditions, control);
            this._toggleValidators(config, control);
            this._toggleControlStates(conditions, control, key);
        }
    }
    _toggleControlStates(conditions, control, controlPath) {
        const actionDisabled = ConditionsActionEnum['control.disabled'];
        const actionHidden = ConditionsActionEnum['control.hidden'];
        const actions = Object.keys(conditions).filter((x) => x === actionDisabled || x === actionHidden);
        if (!actions.length) {
            return;
        }
        for (const action of actions) {
            const bool = this._evaluateConditionsStatement(conditions[action]);
            if (bool === undefined) {
                continue;
            }
            if (action === actionDisabled) {
                this._disableControl(control, bool);
            }
            if (action === actionHidden) {
                // Must toggle visibility before disable, to prevent incorrect behavior of child element
                // e.g. Primeng Textarea `autoResize` will fail
                this._hideControl$(controlPath, bool)
                    .pipe(tap(() => this._disableControl(control, bool)))
                    .subscribe();
            }
        }
    }
    _disableControl(control, disable) {
        disable ? control.disable() : control.enable();
        this._globalVariableService.rootForm?.updateValueAndValidity();
    }
    _hideControl$(controlPath, hide) {
        const setStyle = (el, name, value) => {
            if (hide) {
                el.style.setProperty(name, value);
            }
            else {
                el.style.removeProperty(name);
            }
        };
        return this._getTargetEl$(controlPath).pipe(filter(Boolean), tap((x) => {
            setStyle(x, 'display', 'none');
        }));
    }
    _toggleValidators(config, control) {
        const { conditions = {}, validators = [] } = config;
        const actionPrefix = {
            asyncValidator: 'asyncValidator',
            validator: 'validator',
        };
        if (!validators.length) {
            return;
        }
        const getActions = (async) => {
            return Object.keys(conditions).filter((x) => {
                const prefix = async
                    ? actionPrefix.asyncValidator
                    : actionPrefix.validator;
                // Get the actions that starts with "validator.xxx" or "asyncValidator.xxx" only
                const regExp = new RegExp(`^${prefix}\.[a-zA-z]{1,}$`);
                return regExp.test(x);
            });
        };
        const getConditionValidatorConfigs = (async) => {
            const actions = getActions(async);
            const result = validators.filter((x) => {
                const prefix = async
                    ? actionPrefix.asyncValidator
                    : actionPrefix.validator;
                const actionName = `${prefix}.${x.name ?? ''}`;
                const target = actions.includes(actionName);
                if (target) {
                    return this._evaluateConditionsStatement(conditions[actionName]);
                }
                return true;
            });
            return result;
        };
        const toggleValidators = () => {
            const validatorConfigs = getConditionValidatorConfigs(false);
            const validatorFns = this._formValidationService.getValidators(validatorConfigs);
            control.setValidators(validatorFns);
        };
        const toggleAsyncValidators = () => {
            const validatorConfigs = getConditionValidatorConfigs(true);
            const validatorFns = this._formValidationService.getAsyncValidators(validatorConfigs);
            control.setAsyncValidators(validatorFns);
        };
        toggleValidators();
        toggleAsyncValidators();
        control.updateValueAndValidity();
        this._globalVariableService.rootForm?.updateValueAndValidity();
    }
    _executeCustomActions(conditions, control) {
        const definedActions = Object.values(ConditionsActionEnum);
        const customActions = Object.keys(conditions).filter((x) => !definedActions.includes(x));
        if (!customActions.length) {
            return;
        }
        for (const action of customActions) {
            const bool = this._evaluateConditionsStatement(conditions[action]);
            if (!bool)
                continue;
            const functions = this._globalVariableService.conditionsActionFunctions;
            if (!functions)
                continue;
            if (!functions[action])
                continue;
            if (typeof functions[action] !== 'function')
                continue;
            functions[action](control);
        }
    }
    /**Get the target element by using `id`(full control path) on each `div` inside current NgDynamicJsonForm instance */
    _getTargetEl$(controlPath) {
        if (typeof window === 'undefined') {
            return of(null);
        }
        return new Observable((subscriber) => {
            window.requestAnimationFrame(() => {
                // Use `CSS.escape()` to escape all the invalid characters.
                const element = this._globalVariableService.hostElement?.querySelector(`#${CSS.escape(controlPath)}`);
                subscriber.next(!element ? null : element);
                subscriber.complete();
                subscriber.unsubscribe();
            });
        });
    }
    _getPathsOfControlsToListen(configs) {
        const extractPaths = (group) => {
            const value = group['&&'] || group['||'];
            if (!value)
                return [];
            return value.flatMap((x) => Array.isArray(x)
                ? [
                    this._getControlPathFromStatement(x[0]) ?? '',
                    this._getControlPathFromStatement(x[2]) ?? '',
                ]
                : extractPaths(x));
        };
        const result = configs.reduce((acc, curr) => {
            const { conditions, children } = curr;
            const paths = !conditions
                ? []
                : Object.values(conditions)
                    .filter((x) => Boolean(x) && Object.keys(x).length > 0)
                    .flatMap((x) => extractPaths(x))
                    .filter(Boolean);
            const childrenPaths = !children?.length
                ? []
                : this._getPathsOfControlsToListen(children);
            acc.push(...paths.concat(childrenPaths));
            return acc;
        }, []);
        const removeDuplicates = [...new Set(result)];
        return removeDuplicates;
    }
    /**
     * Get all the configs which has `conditions` set.
     *
     * @description
     * The `fullControlPath` is the path to the control where the conditions will have effect on it.
     */
    _configsWithConditions(configs, parentControlPath) {
        const result = configs.reduce((acc, curr) => {
            const { conditions, children } = curr;
            const fullControlPath = parentControlPath
                ? `${parentControlPath}.${curr.formControlName}`
                : curr.formControlName;
            if (conditions)
                acc[fullControlPath] = curr;
            if (children && children.length) {
                acc = {
                    ...acc,
                    ...this._configsWithConditions(children, fullControlPath),
                };
            }
            return acc;
        }, {});
        return result;
    }
    _evaluateConditionsStatement(conditionsGroup) {
        const form = this._globalVariableService.rootForm;
        if (!form || (!conditionsGroup['&&'] && !conditionsGroup['||'])) {
            return undefined;
        }
        const mapTupleFn = (tuple) => {
            const [left, operator, right] = tuple;
            const result = [
                this._getValueFromStatement(left),
                operator,
                this._getValueFromStatement(right),
            ];
            return result;
        };
        return evaluateConditionsStatements(conditionsGroup, mapTupleFn);
    }
    /**
     * Get control path using the string in the conditions statement tuple.
     *
     * ```js
     * form = new FormGroup{
     *  controlA: new FormControl(),
     *  controlB: new FormControl(),
     * }
     * ```
     *
     * - "controlA" => Should get "controlA"
     * - "controlB" => Should get "controlB"
     * - "controlA,prop1" => Should get "controlA"
     * - "controlC" => undefined
     */
    _getControlPathFromStatement(input) {
        const form = this._globalVariableService.rootForm;
        if (!form)
            return undefined;
        if (typeof input !== 'string')
            return undefined;
        const paths = getControlAndValuePath(input);
        const targetControl = form.get(paths.controlPath);
        if (!targetControl)
            return undefined;
        return paths.controlPath;
    }
    /**Get the value from the statement, either it's literally a value or comes from a control
     *
     * ```js
     * formValue = {
     *   controlA: 'textValue',
     *   controlB: false
     * }
     * ```
     *
     * - "controlA" => "textValue"
     * - "controlB" => false
     */
    _getValueFromStatement(input) {
        const form = this._globalVariableService.rootForm;
        if (!form)
            return input;
        if (typeof input !== 'string')
            return input;
        const paths = getControlAndValuePath(input);
        const targetControl = form.get(paths.controlPath);
        // If it is string but not found in the FormGroup,
        // then we consider it as literal string value,
        // not control path.
        if (!targetControl)
            return input;
        const result = !paths.valuePath
            ? targetControl.value
            : getValueInObject(targetControl.value, paths.valuePath);
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormConditionsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormConditionsService }); }
}
export { FormConditionsService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormConditionsService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb25kaXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvY29yZS9zZXJ2aWNlcy9mb3JtLWNvbmRpdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQ0wsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sSUFBSSxFQUNKLFFBQVEsRUFDUixFQUFFLEVBQ0YsU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFFTCxvQkFBb0IsR0FJckIsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBRWxFLE1BQ2EscUJBQXFCO0lBRGxDO1FBRVUsMkJBQXNCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdkQsMkJBQXNCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FvWGhFO0lBbFhDOzs7T0FHRztJQUNILGlCQUFpQjtRQUNmLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUM7UUFDeEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztRQUVsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxPQUFP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IjpbImltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgT2JzZXJ2YWJsZSxcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgZnJvbSxcbiAgbWVyZ2VNYXAsXG4gIG9mLFxuICBzdGFydFdpdGgsXG4gIHRhcCxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDb25kaXRpb25zLFxuICBDb25kaXRpb25zQWN0aW9uRW51bSxcbiAgQ29uZGl0aW9uc0dyb3VwLFxuICBDb25kaXRpb25zU3RhdGVtZW50VHVwbGUsXG4gIEZvcm1Db250cm9sQ29uZmlnLFxufSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgZXZhbHVhdGVDb25kaXRpb25zU3RhdGVtZW50cyB9IGZyb20gJy4uL3V0aWxpdGllcy9ldmFsdWF0ZS1jb25kaXRpb25zLXN0YXRlbWVudHMnO1xuaW1wb3J0IHsgZ2V0Q29udHJvbEFuZFZhbHVlUGF0aCB9IGZyb20gJy4uL3V0aWxpdGllcy9nZXQtY29udHJvbC1hbmQtdmFsdWUtcGF0aCc7XG5pbXBvcnQgeyBnZXRWYWx1ZUluT2JqZWN0IH0gZnJvbSAnLi4vdXRpbGl0aWVzL2dldC12YWx1ZS1pbi1vYmplY3QnO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLXZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxWYXJpYWJsZVNlcnZpY2UgfSBmcm9tICcuL2dsb2JhbC12YXJpYWJsZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1Db25kaXRpb25zU2VydmljZSB7XG4gIHByaXZhdGUgX2dsb2JhbFZhcmlhYmxlU2VydmljZSA9IGluamVjdChHbG9iYWxWYXJpYWJsZVNlcnZpY2UpO1xuICBwcml2YXRlIF9mb3JtVmFsaWRhdGlvblNlcnZpY2UgPSBpbmplY3QoRm9ybVZhbGlkYXRpb25TZXJ2aWNlKTtcblxuICAvKipMaXN0ZW4gdG8gdGhlIGNvbnRyb2xzIHRoYXQgc3BlY2lmaWVkIGluIGBjb25kaXRpb25zYCB0byB0cmlnZ2VyIHRoZSBgdGFyZ2V0Q29udHJvbGAgc3RhdHVzIGFuZCB2YWxpZGF0b3JzXG4gICAqIEBwYXJhbSBmb3JtIFRoZSByb290IGZvcm1cbiAgICogQHBhcmFtIGNvbmZpZ3MgVGhlIEpTT04gZGF0YVxuICAgKi9cbiAgbGlzdGVuQ29uZGl0aW9ucyQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBjb25maWdzID0gdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLnJvb3RDb25maWdzO1xuICAgIGNvbnN0IGZvcm0gPSB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2Uucm9vdEZvcm07XG5cbiAgICBpZiAoIWNvbmZpZ3MubGVuZ3RoIHx8ICFmb3JtIHx8IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udHJvbHMgPSB0aGlzLl9nZXRQYXRoc09mQ29udHJvbHNUb0xpc3Rlbihjb25maWdzKVxuICAgICAgLm1hcCgoeCkgPT4gZm9ybS5nZXQoeCkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIEFic3RyYWN0Q29udHJvbFtdO1xuXG4gICAgY29uc3QgY29uZmlnc1dpdGhDb25kaXRpb25zID0gdGhpcy5fY29uZmlnc1dpdGhDb25kaXRpb25zKGNvbmZpZ3MpO1xuICAgIGNvbnN0IHZhbHVlQ2hhbmdlcyQgPSAoYzogQWJzdHJhY3RDb250cm9sKSA9PlxuICAgICAgYy52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKGMudmFsdWUpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoYSwgYikgPT4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpKVxuICAgICAgICAvLyBTaG91bGQgYXZvaWQgdXNpbmcgZGVib3VuY2VUaW1lKCkgaGVyZSwgYXMgaXQgd2lsbCBjYXVzZSBmbGlja2VycyB3aGVuIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eVxuICAgICAgKTtcblxuICAgIHJldHVybiBmcm9tKGNvbnRyb2xzKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoKHgpID0+IHZhbHVlQ2hhbmdlcyQoeCkpLFxuICAgICAgdGFwKCgpID0+IHRoaXMuX2hhbmRsZVZhbHVlQ2hhbmdlcyhjb25maWdzV2l0aENvbmRpdGlvbnMpKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVWYWx1ZUNoYW5nZXMoZGF0YToge1xuICAgIFtmdWxsQ29udHJvbFBhdGg6IHN0cmluZ106IEZvcm1Db250cm9sQ29uZmlnO1xuICB9KTogdm9pZCB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5yb290Rm9ybTtcbiAgICBpZiAoIWZvcm0pIHJldHVybjtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtLmdldChrZXkpO1xuICAgICAgaWYgKCFjb250cm9sKSBjb250aW51ZTtcblxuICAgICAgY29uc3QgY29uZmlnID0gZGF0YVtrZXldO1xuICAgICAgY29uc3QgY29uZGl0aW9ucyA9IGNvbmZpZy5jb25kaXRpb25zITtcblxuICAgICAgdGhpcy5fZXhlY3V0ZUN1c3RvbUFjdGlvbnMoY29uZGl0aW9ucywgY29udHJvbCk7XG4gICAgICB0aGlzLl90b2dnbGVWYWxpZGF0b3JzKGNvbmZpZywgY29udHJvbCk7XG4gICAgICB0aGlzLl90b2dnbGVDb250cm9sU3RhdGVzKGNvbmRpdGlvbnMsIGNvbnRyb2wsIGtleSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlQ29udHJvbFN0YXRlcyhcbiAgICBjb25kaXRpb25zOiBDb25kaXRpb25zLFxuICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCxcbiAgICBjb250cm9sUGF0aDogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFjdGlvbkRpc2FibGVkID0gQ29uZGl0aW9uc0FjdGlvbkVudW1bJ2NvbnRyb2wuZGlzYWJsZWQnXTtcbiAgICBjb25zdCBhY3Rpb25IaWRkZW4gPSBDb25kaXRpb25zQWN0aW9uRW51bVsnY29udHJvbC5oaWRkZW4nXTtcbiAgICBjb25zdCBhY3Rpb25zID0gT2JqZWN0LmtleXMoY29uZGl0aW9ucykuZmlsdGVyKFxuICAgICAgKHgpID0+IHggPT09IGFjdGlvbkRpc2FibGVkIHx8IHggPT09IGFjdGlvbkhpZGRlblxuICAgICk7XG5cbiAgICBpZiAoIWFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xuICAgICAgY29uc3QgYm9vbCA9IHRoaXMuX2V2YWx1YXRlQ29uZGl0aW9uc1N0YXRlbWVudChjb25kaXRpb25zW2FjdGlvbl0hKTtcblxuICAgICAgaWYgKGJvb2wgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGlvbiA9PT0gYWN0aW9uRGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZUNvbnRyb2woY29udHJvbCwgYm9vbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gPT09IGFjdGlvbkhpZGRlbikge1xuICAgICAgICAvLyBNdXN0IHRvZ2dsZSB2aXNpYmlsaXR5IGJlZm9yZSBkaXNhYmxlLCB0byBwcmV2ZW50IGluY29ycmVjdCBiZWhhdmlvciBvZiBjaGlsZCBlbGVtZW50XG4gICAgICAgIC8vIGUuZy4gUHJpbWVuZyBUZXh0YXJlYSBgYXV0b1Jlc2l6ZWAgd2lsbCBmYWlsXG4gICAgICAgIHRoaXMuX2hpZGVDb250cm9sJChjb250cm9sUGF0aCwgYm9vbClcbiAgICAgICAgICAucGlwZSh0YXAoKCkgPT4gdGhpcy5fZGlzYWJsZUNvbnRyb2woY29udHJvbCwgYm9vbCkpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlQ29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGRpc2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBkaXNhYmxlID8gY29udHJvbC5kaXNhYmxlKCkgOiBjb250cm9sLmVuYWJsZSgpO1xuICAgIHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5yb290Rm9ybT8udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZUNvbnRyb2wkKGNvbnRyb2xQYXRoOiBzdHJpbmcsIGhpZGU6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHNldFN0eWxlID0gKGVsOiBIVE1MRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICBpZiAoaGlkZSkge1xuICAgICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMuX2dldFRhcmdldEVsJChjb250cm9sUGF0aCkucGlwZShcbiAgICAgIGZpbHRlcihCb29sZWFuKSxcbiAgICAgIHRhcCgoeCkgPT4ge1xuICAgICAgICBzZXRTdHlsZSh4LCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF90b2dnbGVWYWxpZGF0b3JzKFxuICAgIGNvbmZpZzogRm9ybUNvbnRyb2xDb25maWcsXG4gICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29uZGl0aW9ucyA9IHt9LCB2YWxpZGF0b3JzID0gW10gfSA9IGNvbmZpZztcbiAgICBjb25zdCBhY3Rpb25QcmVmaXggPSB7XG4gICAgICBhc3luY1ZhbGlkYXRvcjogJ2FzeW5jVmFsaWRhdG9yJyxcbiAgICAgIHZhbGlkYXRvcjogJ3ZhbGlkYXRvcicsXG4gICAgfTtcblxuICAgIGlmICghdmFsaWRhdG9ycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRBY3Rpb25zID0gKGFzeW5jOiBib29sZWFuKSA9PiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29uZGl0aW9ucykuZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGFzeW5jXG4gICAgICAgICAgPyBhY3Rpb25QcmVmaXguYXN5bmNWYWxpZGF0b3JcbiAgICAgICAgICA6IGFjdGlvblByZWZpeC52YWxpZGF0b3I7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBhY3Rpb25zIHRoYXQgc3RhcnRzIHdpdGggXCJ2YWxpZGF0b3IueHh4XCIgb3IgXCJhc3luY1ZhbGlkYXRvci54eHhcIiBvbmx5XG4gICAgICAgIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1cXC5bYS16QS16XXsxLH0kYCk7XG5cbiAgICAgICAgcmV0dXJuIHJlZ0V4cC50ZXN0KHgpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldENvbmRpdGlvblZhbGlkYXRvckNvbmZpZ3MgPSAoYXN5bmM6IGJvb2xlYW4pID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbnMgPSBnZXRBY3Rpb25zKGFzeW5jKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbGlkYXRvcnMuZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGFzeW5jXG4gICAgICAgICAgPyBhY3Rpb25QcmVmaXguYXN5bmNWYWxpZGF0b3JcbiAgICAgICAgICA6IGFjdGlvblByZWZpeC52YWxpZGF0b3I7XG4gICAgICAgIGNvbnN0IGFjdGlvbk5hbWUgPSBgJHtwcmVmaXh9LiR7eC5uYW1lID8/ICcnfWAgYXMgQ29uZGl0aW9uc0FjdGlvbkVudW07XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uTmFtZSk7XG5cbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9ldmFsdWF0ZUNvbmRpdGlvbnNTdGF0ZW1lbnQoY29uZGl0aW9uc1thY3Rpb25OYW1lXSEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgY29uc3QgdG9nZ2xlVmFsaWRhdG9ycyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckNvbmZpZ3MgPSBnZXRDb25kaXRpb25WYWxpZGF0b3JDb25maWdzKGZhbHNlKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckZucyA9XG4gICAgICAgIHRoaXMuX2Zvcm1WYWxpZGF0aW9uU2VydmljZS5nZXRWYWxpZGF0b3JzKHZhbGlkYXRvckNvbmZpZ3MpO1xuXG4gICAgICBjb250cm9sLnNldFZhbGlkYXRvcnModmFsaWRhdG9yRm5zKTtcbiAgICB9O1xuXG4gICAgY29uc3QgdG9nZ2xlQXN5bmNWYWxpZGF0b3JzID0gKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWRhdG9yQ29uZmlncyA9IGdldENvbmRpdGlvblZhbGlkYXRvckNvbmZpZ3ModHJ1ZSk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JGbnMgPVxuICAgICAgICB0aGlzLl9mb3JtVmFsaWRhdGlvblNlcnZpY2UuZ2V0QXN5bmNWYWxpZGF0b3JzKHZhbGlkYXRvckNvbmZpZ3MpO1xuXG4gICAgICBjb250cm9sLnNldEFzeW5jVmFsaWRhdG9ycyh2YWxpZGF0b3JGbnMpO1xuICAgIH07XG5cbiAgICB0b2dnbGVWYWxpZGF0b3JzKCk7XG4gICAgdG9nZ2xlQXN5bmNWYWxpZGF0b3JzKCk7XG4gICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLnJvb3RGb3JtPy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICBwcml2YXRlIF9leGVjdXRlQ3VzdG9tQWN0aW9ucyhcbiAgICBjb25kaXRpb25zOiBDb25kaXRpb25zLFxuICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBkZWZpbmVkQWN0aW9ucyA9IE9iamVjdC52YWx1ZXMoQ29uZGl0aW9uc0FjdGlvbkVudW0pO1xuICAgIGNvbnN0IGN1c3RvbUFjdGlvbnMgPSBPYmplY3Qua2V5cyhjb25kaXRpb25zKS5maWx0ZXIoXG4gICAgICAoeCkgPT4gIWRlZmluZWRBY3Rpb25zLmluY2x1ZGVzKHggYXMgQ29uZGl0aW9uc0FjdGlvbkVudW0pXG4gICAgKTtcblxuICAgIGlmICghY3VzdG9tQWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBjdXN0b21BY3Rpb25zKSB7XG4gICAgICBjb25zdCBib29sID0gdGhpcy5fZXZhbHVhdGVDb25kaXRpb25zU3RhdGVtZW50KGNvbmRpdGlvbnNbYWN0aW9uXSEpO1xuICAgICAgaWYgKCFib29sKSBjb250aW51ZTtcblxuICAgICAgY29uc3QgZnVuY3Rpb25zID0gdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLmNvbmRpdGlvbnNBY3Rpb25GdW5jdGlvbnM7XG5cbiAgICAgIGlmICghZnVuY3Rpb25zKSBjb250aW51ZTtcbiAgICAgIGlmICghZnVuY3Rpb25zW2FjdGlvbl0pIGNvbnRpbnVlO1xuICAgICAgaWYgKHR5cGVvZiBmdW5jdGlvbnNbYWN0aW9uXSAhPT0gJ2Z1bmN0aW9uJykgY29udGludWU7XG5cbiAgICAgIGZ1bmN0aW9uc1thY3Rpb25dKGNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKkdldCB0aGUgdGFyZ2V0IGVsZW1lbnQgYnkgdXNpbmcgYGlkYChmdWxsIGNvbnRyb2wgcGF0aCkgb24gZWFjaCBgZGl2YCBpbnNpZGUgY3VycmVudCBOZ0R5bmFtaWNKc29uRm9ybSBpbnN0YW5jZSAqL1xuICBwcml2YXRlIF9nZXRUYXJnZXRFbCQoY29udHJvbFBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8SFRNTEVsZW1lbnQgfCBudWxsPiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgLy8gVXNlIGBDU1MuZXNjYXBlKClgIHRvIGVzY2FwZSBhbGwgdGhlIGludmFsaWQgY2hhcmFjdGVycy5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5ob3N0RWxlbWVudD8ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgIyR7Q1NTLmVzY2FwZShjb250cm9sUGF0aCl9YFxuICAgICAgICApO1xuXG4gICAgICAgIHN1YnNjcmliZXIubmV4dCghZWxlbWVudCA/IG51bGwgOiAoZWxlbWVudCBhcyBIVE1MRWxlbWVudCkpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UGF0aHNPZkNvbnRyb2xzVG9MaXN0ZW4oY29uZmlnczogRm9ybUNvbnRyb2xDb25maWdbXSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBleHRyYWN0UGF0aHMgPSAoZ3JvdXA6IENvbmRpdGlvbnNHcm91cCk6IHN0cmluZ1tdID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ3JvdXBbJyYmJ10gfHwgZ3JvdXBbJ3x8J107XG4gICAgICBpZiAoIXZhbHVlKSByZXR1cm4gW107XG5cbiAgICAgIHJldHVybiB2YWx1ZS5mbGF0TWFwKCh4KSA9PlxuICAgICAgICBBcnJheS5pc0FycmF5KHgpXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIHRoaXMuX2dldENvbnRyb2xQYXRoRnJvbVN0YXRlbWVudCh4WzBdKSA/PyAnJyxcbiAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29udHJvbFBhdGhGcm9tU3RhdGVtZW50KHhbMl0pID8/ICcnLFxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogZXh0cmFjdFBhdGhzKHgpXG4gICAgICApO1xuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQgPSBjb25maWdzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICBjb25zdCB7IGNvbmRpdGlvbnMsIGNoaWxkcmVuIH0gPSBjdXJyO1xuICAgICAgY29uc3QgcGF0aHMgPSAhY29uZGl0aW9uc1xuICAgICAgICA/IFtdXG4gICAgICAgIDogT2JqZWN0LnZhbHVlcyhjb25kaXRpb25zKVxuICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4gQm9vbGVhbih4KSAmJiBPYmplY3Qua2V5cyh4ISkubGVuZ3RoID4gMClcbiAgICAgICAgICAgIC5mbGF0TWFwKCh4KSA9PiBleHRyYWN0UGF0aHMoeCEpKVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcblxuICAgICAgY29uc3QgY2hpbGRyZW5QYXRocyA9ICFjaGlsZHJlbj8ubGVuZ3RoXG4gICAgICAgID8gW11cbiAgICAgICAgOiB0aGlzLl9nZXRQYXRoc09mQ29udHJvbHNUb0xpc3RlbihjaGlsZHJlbik7XG5cbiAgICAgIGFjYy5wdXNoKC4uLnBhdGhzLmNvbmNhdChjaGlsZHJlblBhdGhzKSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdIGFzIHN0cmluZ1tdKTtcblxuICAgIGNvbnN0IHJlbW92ZUR1cGxpY2F0ZXMgPSBbLi4ubmV3IFNldChyZXN1bHQpXTtcbiAgICByZXR1cm4gcmVtb3ZlRHVwbGljYXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHRoZSBjb25maWdzIHdoaWNoIGhhcyBgY29uZGl0aW9uc2Agc2V0LlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGBmdWxsQ29udHJvbFBhdGhgIGlzIHRoZSBwYXRoIHRvIHRoZSBjb250cm9sIHdoZXJlIHRoZSBjb25kaXRpb25zIHdpbGwgaGF2ZSBlZmZlY3Qgb24gaXQuXG4gICAqL1xuICBwcml2YXRlIF9jb25maWdzV2l0aENvbmRpdGlvbnMoXG4gICAgY29uZmlnczogRm9ybUNvbnRyb2xDb25maWdbXSxcbiAgICBwYXJlbnRDb250cm9sUGF0aD86IHN0cmluZ1xuICApOiB7IFtmdWxsQ29udHJvbFBhdGg6IHN0cmluZ106IEZvcm1Db250cm9sQ29uZmlnIH0ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGNvbmZpZ3MucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIGNvbnN0IHsgY29uZGl0aW9ucywgY2hpbGRyZW4gfSA9IGN1cnI7XG4gICAgICBjb25zdCBmdWxsQ29udHJvbFBhdGggPSBwYXJlbnRDb250cm9sUGF0aFxuICAgICAgICA/IGAke3BhcmVudENvbnRyb2xQYXRofS4ke2N1cnIuZm9ybUNvbnRyb2xOYW1lfWBcbiAgICAgICAgOiBjdXJyLmZvcm1Db250cm9sTmFtZTtcblxuICAgICAgaWYgKGNvbmRpdGlvbnMpIGFjY1tmdWxsQ29udHJvbFBhdGhdID0gY3VycjtcbiAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgYWNjID0ge1xuICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAuLi50aGlzLl9jb25maWdzV2l0aENvbmRpdGlvbnMoY2hpbGRyZW4sIGZ1bGxDb250cm9sUGF0aCksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgeyBbZnVsbENvbnRyb2xQYXRoOiBzdHJpbmddOiBGb3JtQ29udHJvbENvbmZpZyB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9ldmFsdWF0ZUNvbmRpdGlvbnNTdGF0ZW1lbnQoXG4gICAgY29uZGl0aW9uc0dyb3VwOiBDb25kaXRpb25zR3JvdXBcbiAgKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5yb290Rm9ybTtcblxuICAgIGlmICghZm9ybSB8fCAoIWNvbmRpdGlvbnNHcm91cFsnJiYnXSAmJiAhY29uZGl0aW9uc0dyb3VwWyd8fCddKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBtYXBUdXBsZUZuID0gKHR1cGxlOiBDb25kaXRpb25zU3RhdGVtZW50VHVwbGUpID0+IHtcbiAgICAgIGNvbnN0IFtsZWZ0LCBvcGVyYXRvciwgcmlnaHRdID0gdHVwbGU7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXG4gICAgICAgIHRoaXMuX2dldFZhbHVlRnJvbVN0YXRlbWVudChsZWZ0KSxcbiAgICAgICAgb3BlcmF0b3IsXG4gICAgICAgIHRoaXMuX2dldFZhbHVlRnJvbVN0YXRlbWVudChyaWdodCksXG4gICAgICBdIGFzIENvbmRpdGlvbnNTdGF0ZW1lbnRUdXBsZTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2YWx1YXRlQ29uZGl0aW9uc1N0YXRlbWVudHMoY29uZGl0aW9uc0dyb3VwLCBtYXBUdXBsZUZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29udHJvbCBwYXRoIHVzaW5nIHRoZSBzdHJpbmcgaW4gdGhlIGNvbmRpdGlvbnMgc3RhdGVtZW50IHR1cGxlLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiBmb3JtID0gbmV3IEZvcm1Hcm91cHtcbiAgICogIGNvbnRyb2xBOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICogIGNvbnRyb2xCOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogLSBcImNvbnRyb2xBXCIgPT4gU2hvdWxkIGdldCBcImNvbnRyb2xBXCJcbiAgICogLSBcImNvbnRyb2xCXCIgPT4gU2hvdWxkIGdldCBcImNvbnRyb2xCXCJcbiAgICogLSBcImNvbnRyb2xBLHByb3AxXCIgPT4gU2hvdWxkIGdldCBcImNvbnRyb2xBXCJcbiAgICogLSBcImNvbnRyb2xDXCIgPT4gdW5kZWZpbmVkXG4gICAqL1xuICBwcml2YXRlIF9nZXRDb250cm9sUGF0aEZyb21TdGF0ZW1lbnQoaW5wdXQ6IGFueSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5yb290Rm9ybTtcbiAgICBpZiAoIWZvcm0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBwYXRocyA9IGdldENvbnRyb2xBbmRWYWx1ZVBhdGgoaW5wdXQpO1xuICAgIGNvbnN0IHRhcmdldENvbnRyb2wgPSBmb3JtLmdldChwYXRocy5jb250cm9sUGF0aCk7XG5cbiAgICBpZiAoIXRhcmdldENvbnRyb2wpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHBhdGhzLmNvbnRyb2xQYXRoO1xuICB9XG5cbiAgLyoqR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdGF0ZW1lbnQsIGVpdGhlciBpdCdzIGxpdGVyYWxseSBhIHZhbHVlIG9yIGNvbWVzIGZyb20gYSBjb250cm9sXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIGZvcm1WYWx1ZSA9IHtcbiAgICogICBjb250cm9sQTogJ3RleHRWYWx1ZScsXG4gICAqICAgY29udHJvbEI6IGZhbHNlXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIC0gXCJjb250cm9sQVwiID0+IFwidGV4dFZhbHVlXCJcbiAgICogLSBcImNvbnRyb2xCXCIgPT4gZmFsc2VcbiAgICovXG4gIHByaXZhdGUgX2dldFZhbHVlRnJvbVN0YXRlbWVudChpbnB1dDogYW55KTogYW55IHtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5fZ2xvYmFsVmFyaWFibGVTZXJ2aWNlLnJvb3RGb3JtO1xuXG4gICAgaWYgKCFmb3JtKSByZXR1cm4gaW5wdXQ7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHJldHVybiBpbnB1dDtcblxuICAgIGNvbnN0IHBhdGhzID0gZ2V0Q29udHJvbEFuZFZhbHVlUGF0aChpbnB1dCk7XG4gICAgY29uc3QgdGFyZ2V0Q29udHJvbCA9IGZvcm0uZ2V0KHBhdGhzLmNvbnRyb2xQYXRoKTtcblxuICAgIC8vIElmIGl0IGlzIHN0cmluZyBidXQgbm90IGZvdW5kIGluIHRoZSBGb3JtR3JvdXAsXG4gICAgLy8gdGhlbiB3ZSBjb25zaWRlciBpdCBhcyBsaXRlcmFsIHN0cmluZyB2YWx1ZSxcbiAgICAvLyBub3QgY29udHJvbCBwYXRoLlxuICAgIGlmICghdGFyZ2V0Q29udHJvbCkgcmV0dXJuIGlucHV0O1xuXG4gICAgY29uc3QgcmVzdWx0ID0gIXBhdGhzLnZhbHVlUGF0aFxuICAgICAgPyB0YXJnZXRDb250cm9sLnZhbHVlXG4gICAgICA6IGdldFZhbHVlSW5PYmplY3QodGFyZ2V0Q29udHJvbC52YWx1ZSwgcGF0aHMudmFsdWVQYXRoKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==