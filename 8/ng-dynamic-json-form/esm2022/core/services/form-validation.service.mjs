import { Injectable, inject } from '@angular/core';
import { Validators, } from '@angular/forms';
import { EMPTY, map, startWith } from 'rxjs';
import { ValidatorsEnum } from '../models';
import { GlobalVariableService } from './global-variable.service';
import * as i0 from "@angular/core";
function emailValidator(control) {
    const emailValid = RegExp(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/).test(control.value);
    if (!control.value) {
        return null;
    }
    return emailValid ? null : { email: 'Invalid email format' };
}
const builtInValidators = (value) => ({
    [ValidatorsEnum.required]: Validators.required,
    [ValidatorsEnum.requiredTrue]: Validators.requiredTrue,
    [ValidatorsEnum.email]: emailValidator,
    [ValidatorsEnum.pattern]: Validators.pattern(value),
    [ValidatorsEnum.min]: Validators.min(value),
    [ValidatorsEnum.max]: Validators.max(value),
    [ValidatorsEnum.minLength]: Validators.minLength(value),
    [ValidatorsEnum.maxLength]: Validators.maxLength(value),
});
class FormValidationService {
    constructor() {
        this._globalVariableService = inject(GlobalVariableService);
    }
    getErrorMessages$(control, validators) {
        if (!control || !validators?.length) {
            return EMPTY;
        }
        return control.statusChanges.pipe(startWith(control.status), map(() => this._getErrorMessages(control.errors, control.value, validators)));
    }
    getValidators(input) {
        if (!input || !input.length) {
            return [];
        }
        // Remove duplicates
        const filteredConfigs = [
            ...new Map(input.map((v) => [v.name, v])).values(),
        ];
        const customValidators = this._globalVariableService.customValidators;
        const validatorFns = filteredConfigs.map((item) => {
            const { name } = item;
            const value = this._getValidatorValue(item);
            const builtInValidator = builtInValidators(value)[name];
            const customValidator = this._getValidatorFn(item, customValidators?.[name]);
            const result = customValidator ?? builtInValidator;
            return result;
        });
        return validatorFns.filter(Boolean);
    }
    getAsyncValidators(input) {
        if (!input || !input.length) {
            return [];
        }
        // Remove duplicates
        const filteredConfigs = [
            ...new Map(input.map((v) => [v.name, v])).values(),
        ];
        const customAsyncValidators = this._globalVariableService.customAsyncValidators;
        const validatorFns = filteredConfigs.map((item) => {
            const validatorFn = customAsyncValidators?.[item.name];
            return this._getValidatorFn(item, validatorFn);
        });
        return validatorFns.filter(Boolean);
    }
    /**Get the error messages of the control
     *
     * @description
     * Try to get the custom error message specified in the config first,
     * else use the error message in the `ValidationErrors`.
     *
     * When using custom validator, the custom message most likely will not working,
     * it's because we are using the key in the errors to find the config message.
     * Since user can define the error object, it becomes very difficult to match the config name
     * with the keys in the error object.
     */
    _getErrorMessages(controlErrors, controlValue, validatorConfigs) {
        if (!controlErrors) {
            return [];
        }
        const errorMessage = (error) => {
            return typeof error === 'string' ? error : JSON.stringify(error);
        };
        return Object.keys(controlErrors).reduce((acc, key) => {
            const error = controlErrors[key];
            const config = this._getConfigFromErrorKey({ [key]: error }, validatorConfigs);
            const configMessage = config?.message;
            const defaultMessage = this._globalVariableService.validationMessages?.[config?.name ?? ''];
            const customMessage = (configMessage || defaultMessage)
                ?.replace(/{{value}}/g, controlValue || '')
                .replace(/{{validatorValue}}/g, config?.value);
            acc.push(customMessage || errorMessage(error));
            return acc;
        }, []);
    }
    _getConfigFromErrorKey(error, configs) {
        // The key mapping of the `ValidationErrors` with the `ValidatorConfig`,
        // to let us get the correct message by using `name` of `ValidatorConfig`.
        const valueKeyMapping = {
            pattern: 'requiredPattern',
            min: 'min',
            max: 'max',
            minLength: 'requiredLength',
            maxLength: 'requiredLength',
        };
        const getValidatorValue = (v) => {
            return typeof v !== 'number' && !isNaN(v) ? parseFloat(v) : v;
        };
        const [errorKey, errorValue] = Object.entries(error)[0];
        const result = configs.find((item) => {
            const { name, value } = item;
            if (errorKey !== name.toLowerCase()) {
                return false;
            }
            if (value === undefined || value === null || value === '') {
                return true;
            }
            const targetKey = valueKeyMapping[name] ?? '';
            const requiredValue = errorValue[targetKey];
            const validatorValue = getValidatorValue(value);
            return requiredValue && name === 'pattern'
                ? requiredValue.includes(validatorValue)
                : requiredValue === validatorValue;
        });
        return result;
    }
    _getValidatorValue(validatorConfig) {
        const { name, value, flags } = validatorConfig;
        switch (name) {
            case ValidatorsEnum.pattern:
                return value instanceof RegExp ? value : new RegExp(value, flags);
            case ValidatorsEnum.min:
            case ValidatorsEnum.max:
            case ValidatorsEnum.minLength:
            case ValidatorsEnum.maxLength:
                try {
                    return typeof value !== 'number' ? parseFloat(value) : value;
                }
                catch {
                    break;
                }
            default:
                return value;
        }
    }
    /**
     * Get validatorFn from either validatorFn or factory function that return a validatorFn.
     * If it's a factory function, return the validatorFn instead.
     *
     * @param validatorConfig
     * @param validatorFn
     */
    _getValidatorFn(validatorConfig, validatorFn) {
        const { value } = validatorConfig;
        if (!validatorFn) {
            return null;
        }
        const result = typeof validatorFn({}) !== 'function'
            ? validatorFn
            : validatorFn(value);
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValidationService }); }
}
export { FormValidationService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValidationService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvY29yZS9zZXJ2aWNlcy9mb3JtLXZhbGlkYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBS0wsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLEtBQUssRUFBYyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBcUMsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUVsRSxTQUFTLGNBQWMsQ0FBQyxPQUF3QjtJQUM5QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxJQUFJLENBQ3JFLE9BQU8sQ0FBQyxLQUFLLENBQ2QsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDO0FBQy9ELENBQUM7QUFFRCxNQUFNLGlCQUFpQixHQUFHLENBQ3hCLEtBQVcsRUFHWCxFQUFFLENBQ0YsQ0FBQztJQUNDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxRQUFRO0lBQzlDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxZQUFZO0lBQ3RELENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLGNBQWM7SUFDdEMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUs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SyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDOUQ7Z0JBQUMsTUFBTTtvQkFDTixNQUFNO2lCQUNQO1lBRUg7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssZUFBZSxDQUNyQixlQUFnQyxFQUNoQyxXQUdhO1FBRWIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLGVBQWUsQ0FBQztRQUVsQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLE1BQU0sR0FDVixPQUFPLFdBQVcsQ0FBQyxFQUFTLENBQUMsS0FBSyxVQUFVO1lBQzFDLENBQUMsQ0FBQyxXQUFXO1lBQ2IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QixPQUFPLE1BQXdDLENBQUM7SUFDbEQsQ0FBQzsrR0E1TVUscUJBQXFCO21IQUFyQixxQkFBcUI7O1NBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIEFzeW5jVmFsaWRhdG9yRm4sXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvckZuLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEN1c3RvbVZhbGlkYXRvcnMsIFZhbGlkYXRvckNvbmZpZywgVmFsaWRhdG9yc0VudW0gfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgQ3VzdG9tQXN5bmNWYWxpZGF0b3JzIH0gZnJvbSAnLi4vbW9kZWxzL2N1c3RvbS1hc3luYy12YWxpZGF0b3JzLnR5cGUnO1xuaW1wb3J0IHsgR2xvYmFsVmFyaWFibGVTZXJ2aWNlIH0gZnJvbSAnLi9nbG9iYWwtdmFyaWFibGUuc2VydmljZSc7XG5cbmZ1bmN0aW9uIGVtYWlsVmFsaWRhdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgY29uc3QgZW1haWxWYWxpZCA9IFJlZ0V4cCgvXlteQFxccyEoKXt9PD5dK0BbXFx3LV0rKFxcLltBLVphLXpdKykrJC8pLnRlc3QoXG4gICAgY29udHJvbC52YWx1ZVxuICApO1xuXG4gIGlmICghY29udHJvbC52YWx1ZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGVtYWlsVmFsaWQgPyBudWxsIDogeyBlbWFpbDogJ0ludmFsaWQgZW1haWwgZm9ybWF0JyB9O1xufVxuXG5jb25zdCBidWlsdEluVmFsaWRhdG9ycyA9IChcbiAgdmFsdWU/OiBhbnlcbik6IHtcbiAgW2tleSBpbiBWYWxpZGF0b3JzRW51bV0/OiBWYWxpZGF0b3JGbjtcbn0gPT5cbiAgKHtcbiAgICBbVmFsaWRhdG9yc0VudW0ucmVxdWlyZWRdOiBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgIFtWYWxpZGF0b3JzRW51bS5yZXF1aXJlZFRydWVdOiBWYWxpZGF0b3JzLnJlcXVpcmVkVHJ1ZSxcbiAgICBbVmFsaWRhdG9yc0VudW0uZW1haWxdOiBlbWFpbFZhbGlkYXRvcixcbiAgICBbVmFsaWRhdG9yc0VudW0ucGF0dGVybl06IFZhbGlkYXRvcnMucGF0dGVybih2YWx1ZSksXG4gICAgW1ZhbGlkYXRvcnNFbnVtLm1pbl06IFZhbGlkYXRvcnMubWluKHZhbHVlKSxcbiAgICBbVmFsaWRhdG9yc0VudW0ubWF4XTogVmFsaWRhdG9ycy5tYXgodmFsdWUpLFxuICAgIFtWYWxpZGF0b3JzRW51bS5taW5MZW5ndGhdOiBWYWxpZGF0b3JzLm1pbkxlbmd0aCh2YWx1ZSksXG4gICAgW1ZhbGlkYXRvcnNFbnVtLm1heExlbmd0aF06IFZhbGlkYXRvcnMubWF4TGVuZ3RoKHZhbHVlKSxcbiAgfSBhcyBjb25zdCk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtVmFsaWRhdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIF9nbG9iYWxWYXJpYWJsZVNlcnZpY2UgPSBpbmplY3QoR2xvYmFsVmFyaWFibGVTZXJ2aWNlKTtcblxuICBnZXRFcnJvck1lc3NhZ2VzJChcbiAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHZhbGlkYXRvcnM/OiBWYWxpZGF0b3JDb25maWdbXVxuICApOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgaWYgKCFjb250cm9sIHx8ICF2YWxpZGF0b3JzPy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBFTVBUWTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udHJvbC5zdGF0dXNDaGFuZ2VzLnBpcGUoXG4gICAgICBzdGFydFdpdGgoY29udHJvbC5zdGF0dXMpLFxuICAgICAgbWFwKCgpID0+XG4gICAgICAgIHRoaXMuX2dldEVycm9yTWVzc2FnZXMoY29udHJvbC5lcnJvcnMsIGNvbnRyb2wudmFsdWUsIHZhbGlkYXRvcnMpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGdldFZhbGlkYXRvcnMoaW5wdXQ6IFZhbGlkYXRvckNvbmZpZ1tdIHwgdW5kZWZpbmVkKTogVmFsaWRhdG9yRm5bXSB7XG4gICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBmaWx0ZXJlZENvbmZpZ3MgPSBbXG4gICAgICAuLi5uZXcgTWFwKGlucHV0Lm1hcCgodikgPT4gW3YubmFtZSwgdl0pKS52YWx1ZXMoKSxcbiAgICBdO1xuXG4gICAgY29uc3QgY3VzdG9tVmFsaWRhdG9ycyA9IHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS5jdXN0b21WYWxpZGF0b3JzO1xuICAgIGNvbnN0IHZhbGlkYXRvckZucyA9IGZpbHRlcmVkQ29uZmlncy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gaXRlbTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZ2V0VmFsaWRhdG9yVmFsdWUoaXRlbSk7XG4gICAgICBjb25zdCBidWlsdEluVmFsaWRhdG9yID0gYnVpbHRJblZhbGlkYXRvcnModmFsdWUpW25hbWUgYXMgVmFsaWRhdG9yc0VudW1dO1xuICAgICAgY29uc3QgY3VzdG9tVmFsaWRhdG9yID0gdGhpcy5fZ2V0VmFsaWRhdG9yRm4oXG4gICAgICAgIGl0ZW0sXG4gICAgICAgIGN1c3RvbVZhbGlkYXRvcnM/LltuYW1lXVxuICAgICAgKSBhcyBWYWxpZGF0b3JGbiB8IG51bGw7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGN1c3RvbVZhbGlkYXRvciA/PyBidWlsdEluVmFsaWRhdG9yO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbGlkYXRvckZucy5maWx0ZXIoQm9vbGVhbikgYXMgVmFsaWRhdG9yRm5bXTtcbiAgfVxuXG4gIGdldEFzeW5jVmFsaWRhdG9ycyhpbnB1dDogVmFsaWRhdG9yQ29uZmlnW10gfCB1bmRlZmluZWQpOiBBc3luY1ZhbGlkYXRvckZuW10ge1xuICAgIGlmICghaW5wdXQgfHwgIWlucHV0Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzXG4gICAgY29uc3QgZmlsdGVyZWRDb25maWdzID0gW1xuICAgICAgLi4ubmV3IE1hcChpbnB1dC5tYXAoKHYpID0+IFt2Lm5hbWUsIHZdKSkudmFsdWVzKCksXG4gICAgXTtcblxuICAgIGNvbnN0IGN1c3RvbUFzeW5jVmFsaWRhdG9ycyA9XG4gICAgICB0aGlzLl9nbG9iYWxWYXJpYWJsZVNlcnZpY2UuY3VzdG9tQXN5bmNWYWxpZGF0b3JzO1xuXG4gICAgY29uc3QgdmFsaWRhdG9yRm5zID0gZmlsdGVyZWRDb25maWdzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgdmFsaWRhdG9yRm4gPSBjdXN0b21Bc3luY1ZhbGlkYXRvcnM/LltpdGVtLm5hbWVdO1xuICAgICAgcmV0dXJuIHRoaXMuX2dldFZhbGlkYXRvckZuKGl0ZW0sIHZhbGlkYXRvckZuKSBhcyBBc3luY1ZhbGlkYXRvckZuIHwgbnVsbDtcbiAgICB9KTtcblxuICAgIHJldHVybiB2YWxpZGF0b3JGbnMuZmlsdGVyKEJvb2xlYW4pIGFzIEFzeW5jVmFsaWRhdG9yRm5bXTtcbiAgfVxuXG4gIC8qKkdldCB0aGUgZXJyb3IgbWVzc2FnZXMgb2YgdGhlIGNvbnRyb2xcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRyeSB0byBnZXQgdGhlIGN1c3RvbSBlcnJvciBtZXNzYWdlIHNwZWNpZmllZCBpbiB0aGUgY29uZmlnIGZpcnN0LFxuICAgKiBlbHNlIHVzZSB0aGUgZXJyb3IgbWVzc2FnZSBpbiB0aGUgYFZhbGlkYXRpb25FcnJvcnNgLlxuICAgKlxuICAgKiBXaGVuIHVzaW5nIGN1c3RvbSB2YWxpZGF0b3IsIHRoZSBjdXN0b20gbWVzc2FnZSBtb3N0IGxpa2VseSB3aWxsIG5vdCB3b3JraW5nLFxuICAgKiBpdCdzIGJlY2F1c2Ugd2UgYXJlIHVzaW5nIHRoZSBrZXkgaW4gdGhlIGVycm9ycyB0byBmaW5kIHRoZSBjb25maWcgbWVzc2FnZS5cbiAgICogU2luY2UgdXNlciBjYW4gZGVmaW5lIHRoZSBlcnJvciBvYmplY3QsIGl0IGJlY29tZXMgdmVyeSBkaWZmaWN1bHQgdG8gbWF0Y2ggdGhlIGNvbmZpZyBuYW1lXG4gICAqIHdpdGggdGhlIGtleXMgaW4gdGhlIGVycm9yIG9iamVjdC5cbiAgICovXG4gIHByaXZhdGUgX2dldEVycm9yTWVzc2FnZXMoXG4gICAgY29udHJvbEVycm9yczogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwsXG4gICAgY29udHJvbFZhbHVlOiBhbnksXG4gICAgdmFsaWRhdG9yQ29uZmlnczogVmFsaWRhdG9yQ29uZmlnW11cbiAgKTogc3RyaW5nW10ge1xuICAgIGlmICghY29udHJvbEVycm9ycykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY29udHJvbEVycm9ycykucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgZXJyb3IgPSBjb250cm9sRXJyb3JzW2tleV07XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLl9nZXRDb25maWdGcm9tRXJyb3JLZXkoXG4gICAgICAgIHsgW2tleV06IGVycm9yIH0sXG4gICAgICAgIHZhbGlkYXRvckNvbmZpZ3NcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNvbmZpZ01lc3NhZ2UgPSBjb25maWc/Lm1lc3NhZ2U7XG4gICAgICBjb25zdCBkZWZhdWx0TWVzc2FnZSA9XG4gICAgICAgIHRoaXMuX2dsb2JhbFZhcmlhYmxlU2VydmljZS52YWxpZGF0aW9uTWVzc2FnZXM/Lltjb25maWc/Lm5hbWUgPz8gJyddO1xuXG4gICAgICBjb25zdCBjdXN0b21NZXNzYWdlID0gKGNvbmZpZ01lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UpXG4gICAgICAgID8ucmVwbGFjZSgve3t2YWx1ZX19L2csIGNvbnRyb2xWYWx1ZSB8fCAnJylcbiAgICAgICAgLnJlcGxhY2UoL3t7dmFsaWRhdG9yVmFsdWV9fS9nLCBjb25maWc/LnZhbHVlKTtcblxuICAgICAgYWNjLnB1c2goY3VzdG9tTWVzc2FnZSB8fCBlcnJvck1lc3NhZ2UoZXJyb3IpKTtcblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSBhcyBzdHJpbmdbXSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb25maWdGcm9tRXJyb3JLZXkoXG4gICAgZXJyb3I6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgY29uZmlnczogVmFsaWRhdG9yQ29uZmlnW11cbiAgKTogVmFsaWRhdG9yQ29uZmlnIHwgdW5kZWZpbmVkIHtcbiAgICAvLyBUaGUga2V5IG1hcHBpbmcgb2YgdGhlIGBWYWxpZGF0aW9uRXJyb3JzYCB3aXRoIHRoZSBgVmFsaWRhdG9yQ29uZmlnYCxcbiAgICAvLyB0byBsZXQgdXMgZ2V0IHRoZSBjb3JyZWN0IG1lc3NhZ2UgYnkgdXNpbmcgYG5hbWVgIG9mIGBWYWxpZGF0b3JDb25maWdgLlxuICAgIGNvbnN0IHZhbHVlS2V5TWFwcGluZzogeyBba2V5IGluIFZhbGlkYXRvcnNFbnVtXT86IHN0cmluZyB9ID0ge1xuICAgICAgcGF0dGVybjogJ3JlcXVpcmVkUGF0dGVybicsXG4gICAgICBtaW46ICdtaW4nLFxuICAgICAgbWF4OiAnbWF4JyxcbiAgICAgIG1pbkxlbmd0aDogJ3JlcXVpcmVkTGVuZ3RoJyxcbiAgICAgIG1heExlbmd0aDogJ3JlcXVpcmVkTGVuZ3RoJyxcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0VmFsaWRhdG9yVmFsdWUgPSAodjogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHYgIT09ICdudW1iZXInICYmICFpc05hTih2KSA/IHBhcnNlRmxvYXQodikgOiB2O1xuICAgIH07XG5cbiAgICBjb25zdCBbZXJyb3JLZXksIGVycm9yVmFsdWVdID0gT2JqZWN0LmVudHJpZXMoZXJyb3IpWzBdO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gY29uZmlncy5maW5kKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBpdGVtO1xuXG4gICAgICBpZiAoZXJyb3JLZXkgIT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFyZ2V0S2V5ID0gdmFsdWVLZXlNYXBwaW5nW25hbWUgYXMgVmFsaWRhdG9yc0VudW1dID8/ICcnO1xuICAgICAgY29uc3QgcmVxdWlyZWRWYWx1ZSA9IGVycm9yVmFsdWVbdGFyZ2V0S2V5XTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclZhbHVlID0gZ2V0VmFsaWRhdG9yVmFsdWUodmFsdWUpO1xuXG4gICAgICByZXR1cm4gcmVxdWlyZWRWYWx1ZSAmJiBuYW1lID09PSAncGF0dGVybidcbiAgICAgICAgPyByZXF1aXJlZFZhbHVlLmluY2x1ZGVzKHZhbGlkYXRvclZhbHVlKVxuICAgICAgICA6IHJlcXVpcmVkVmFsdWUgPT09IHZhbGlkYXRvclZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFZhbGlkYXRvclZhbHVlKHZhbGlkYXRvckNvbmZpZzogVmFsaWRhdG9yQ29uZmlnKSB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSwgZmxhZ3MgfSA9IHZhbGlkYXRvckNvbmZpZztcblxuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSBWYWxpZGF0b3JzRW51bS5wYXR0ZXJuOlxuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgPyB2YWx1ZSA6IG5ldyBSZWdFeHAodmFsdWUsIGZsYWdzKTtcblxuICAgICAgY2FzZSBWYWxpZGF0b3JzRW51bS5taW46XG4gICAgICBjYXNlIFZhbGlkYXRvcnNFbnVtLm1heDpcbiAgICAgIGNhc2UgVmFsaWRhdG9yc0VudW0ubWluTGVuZ3RoOlxuICAgICAgY2FzZSBWYWxpZGF0b3JzRW51bS5tYXhMZW5ndGg6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWxpZGF0b3JGbiBmcm9tIGVpdGhlciB2YWxpZGF0b3JGbiBvciBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJuIGEgdmFsaWRhdG9yRm4uXG4gICAqIElmIGl0J3MgYSBmYWN0b3J5IGZ1bmN0aW9uLCByZXR1cm4gdGhlIHZhbGlkYXRvckZuIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JDb25maWdcbiAgICogQHBhcmFtIHZhbGlkYXRvckZuXG4gICAqL1xuICBwcml2YXRlIF9nZXRWYWxpZGF0b3JGbihcbiAgICB2YWxpZGF0b3JDb25maWc6IFZhbGlkYXRvckNvbmZpZyxcbiAgICB2YWxpZGF0b3JGbjpcbiAgICAgIHwgQ3VzdG9tVmFsaWRhdG9yc1tzdHJpbmddXG4gICAgICB8IEN1c3RvbUFzeW5jVmFsaWRhdG9yc1tzdHJpbmddXG4gICAgICB8IHVuZGVmaW5lZFxuICApOiBWYWxpZGF0b3JGbiB8IEFzeW5jVmFsaWRhdG9yRm4gfCBudWxsIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB2YWxpZGF0b3JDb25maWc7XG5cbiAgICBpZiAoIXZhbGlkYXRvckZuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPVxuICAgICAgdHlwZW9mIHZhbGlkYXRvckZuKHt9IGFzIGFueSkgIT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB2YWxpZGF0b3JGblxuICAgICAgICA6IHZhbGlkYXRvckZuKHZhbHVlKTtcblxuICAgIHJldHVybiByZXN1bHQgYXMgVmFsaWRhdG9yRm4gfCBBc3luY1ZhbGlkYXRvckZuO1xuICB9XG59XG4iXX0=