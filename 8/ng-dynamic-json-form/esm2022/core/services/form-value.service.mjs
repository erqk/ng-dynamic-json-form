import { Injectable } from '@angular/core';
import { isFormControl, isFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
class FormValueService {
    patchForm(form, value) {
        if (!form)
            return;
        for (const key in value) {
            const _value = value[key];
            const control = form.get(key);
            if (!control)
                continue;
            if (isFormControl(control)) {
                control.patchValue(_value);
            }
            if (isFormGroup(control)) {
                this.patchForm(control, _value);
            }
        }
    }
    getFormDisplayValue(value, configs) {
        const keyPreserved = this._getKeyPreservedDisplayValue(value, configs);
        return {
            keyMapped: this._getKeyMappedFormDisplayValue(keyPreserved, configs),
            keyPreserved,
        };
    }
    _getKeyPreservedDisplayValue(formValue, configs) {
        const result = structuredClone(formValue);
        if (typeof result === null || typeof result !== 'object') {
            return result;
        }
        for (const item of configs) {
            const value = result?.[item.formControlName];
            if (item.options) {
                const isDynamicOptions = Boolean(item.options.src && typeof item.options.src !== 'string');
                const labelKey = isDynamicOptions
                    ? item.options.src.mapData?.labelKey ??
                        'label'
                    : 'label';
                const getLabel = (val) => {
                    if (typeof val === 'object')
                        return val?.[labelKey];
                    return item.options?.data?.find((x) => x.value === val)?.label;
                };
                result[item.formControlName] = Array.isArray(value)
                    ? value.map((x) => getLabel(x))
                    : getLabel(value);
            }
            if (!!item.children?.length) {
                result[item.formControlName] = this._getKeyPreservedDisplayValue(value, item.children);
            }
        }
        return result;
    }
    _getKeyMappedFormDisplayValue(value, configs) {
        const newResult = {};
        if (value === null || typeof value !== 'object') {
            return value;
        }
        for (const item of configs) {
            const _value = value[item.formControlName];
            const key = item.label ?? item.formControlName;
            newResult[key] = _value;
            if (!!item.children?.length) {
                newResult[key] = this._getKeyMappedFormDisplayValue(_value, item.children);
            }
        }
        return newResult;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValueService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValueService }); }
}
export { FormValueService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FormValueService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWx1ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvc2VydmljZXMvZm9ybS12YWx1ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFvQixhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBSTlFLE1BQ2EsZ0JBQWdCO0lBQzNCLFNBQVMsQ0FBQyxJQUFrQyxFQUFFLEtBQVU7UUFDdEQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBRWxCLEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3ZCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlCLElBQUksQ0FBQyxPQUFPO2dCQUFFLFNBQVM7WUFFdkIsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUI7WUFFRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDakM7U0FDRjtJQUNILENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE9BQTRCO1FBRTVCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdkUsT0FBTztZQUNMLFNBQVMsRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQztZQUNwRSxZQUFZO1NBQ2IsQ0FBQztJQUNKLENBQUM7SUFFTyw0QkFB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bmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwLCBpc0Zvcm1Db250cm9sLCBpc0Zvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1Db250cm9sQ29uZmlnLCBPcHRpb25Tb3VyY2VDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgRm9ybURpc3BsYXlWYWx1ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLWRpc3BsYXktdmFsdWUuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1WYWx1ZVNlcnZpY2Uge1xuICBwYXRjaEZvcm0oZm9ybTogVW50eXBlZEZvcm1Hcm91cCB8IHVuZGVmaW5lZCwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICghZm9ybSkgcmV0dXJuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIHtcbiAgICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICBjb25zdCBjb250cm9sID0gZm9ybS5nZXQoa2V5KTtcblxuICAgICAgaWYgKCFjb250cm9sKSBjb250aW51ZTtcblxuICAgICAgaWYgKGlzRm9ybUNvbnRyb2woY29udHJvbCkpIHtcbiAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKF92YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Zvcm1Hcm91cChjb250cm9sKSkge1xuICAgICAgICB0aGlzLnBhdGNoRm9ybShjb250cm9sLCBfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1EaXNwbGF5VmFsdWUoXG4gICAgdmFsdWU6IGFueSxcbiAgICBjb25maWdzOiBGb3JtQ29udHJvbENvbmZpZ1tdXG4gICk6IEZvcm1EaXNwbGF5VmFsdWUge1xuICAgIGNvbnN0IGtleVByZXNlcnZlZCA9IHRoaXMuX2dldEtleVByZXNlcnZlZERpc3BsYXlWYWx1ZSh2YWx1ZSwgY29uZmlncyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAga2V5TWFwcGVkOiB0aGlzLl9nZXRLZXlNYXBwZWRGb3JtRGlzcGxheVZhbHVlKGtleVByZXNlcnZlZCwgY29uZmlncyksXG4gICAgICBrZXlQcmVzZXJ2ZWQsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEtleVByZXNlcnZlZERpc3BsYXlWYWx1ZShcbiAgICBmb3JtVmFsdWU6IGFueSxcbiAgICBjb25maWdzOiBGb3JtQ29udHJvbENvbmZpZ1tdXG4gICk6IGFueSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc3RydWN0dXJlZENsb25lKGZvcm1WYWx1ZSk7XG5cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29uZmlncykge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXN1bHQ/LltpdGVtLmZvcm1Db250cm9sTmFtZV07XG5cbiAgICAgIGlmIChpdGVtLm9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgaXNEeW5hbWljT3B0aW9ucyA9IEJvb2xlYW4oXG4gICAgICAgICAgaXRlbS5vcHRpb25zLnNyYyAmJiB0eXBlb2YgaXRlbS5vcHRpb25zLnNyYyAhPT0gJ3N0cmluZydcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBsYWJlbEtleSA9IGlzRHluYW1pY09wdGlvbnNcbiAgICAgICAgICA/IChpdGVtLm9wdGlvbnMuc3JjIGFzIE9wdGlvblNvdXJjZUNvbmZpZykubWFwRGF0YT8ubGFiZWxLZXkgPz9cbiAgICAgICAgICAgICdsYWJlbCdcbiAgICAgICAgICA6ICdsYWJlbCc7XG5cbiAgICAgICAgY29uc3QgZ2V0TGFiZWwgPSAodmFsOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHJldHVybiB2YWw/LltsYWJlbEtleV07XG4gICAgICAgICAgcmV0dXJuIGl0ZW0ub3B0aW9ucz8uZGF0YT8uZmluZCgoeCkgPT4geC52YWx1ZSA9PT0gdmFsKT8ubGFiZWw7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0W2l0ZW0uZm9ybUNvbnRyb2xOYW1lXSA9IEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgICAgICAgPyB2YWx1ZS5tYXAoKHgpID0+IGdldExhYmVsKHgpKVxuICAgICAgICAgIDogZ2V0TGFiZWwodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoISFpdGVtLmNoaWxkcmVuPy5sZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0W2l0ZW0uZm9ybUNvbnRyb2xOYW1lXSA9IHRoaXMuX2dldEtleVByZXNlcnZlZERpc3BsYXlWYWx1ZShcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBpdGVtLmNoaWxkcmVuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEtleU1hcHBlZEZvcm1EaXNwbGF5VmFsdWUoXG4gICAgdmFsdWU6IGFueSxcbiAgICBjb25maWdzOiBGb3JtQ29udHJvbENvbmZpZ1tdXG4gICk6IGFueSB7XG4gICAgY29uc3QgbmV3UmVzdWx0OiBhbnkgPSB7fTtcblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbmZpZ3MpIHtcbiAgICAgIGNvbnN0IF92YWx1ZSA9IHZhbHVlW2l0ZW0uZm9ybUNvbnRyb2xOYW1lXTtcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0ubGFiZWwgPz8gaXRlbS5mb3JtQ29udHJvbE5hbWU7XG5cbiAgICAgIG5ld1Jlc3VsdFtrZXldID0gX3ZhbHVlO1xuXG4gICAgICBpZiAoISFpdGVtLmNoaWxkcmVuPy5sZW5ndGgpIHtcbiAgICAgICAgbmV3UmVzdWx0W2tleV0gPSB0aGlzLl9nZXRLZXlNYXBwZWRGb3JtRGlzcGxheVZhbHVlKFxuICAgICAgICAgIF92YWx1ZSxcbiAgICAgICAgICBpdGVtLmNoaWxkcmVuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1Jlc3VsdDtcbiAgfVxufVxuIl19