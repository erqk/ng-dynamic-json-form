import { AbstractControl, ControlValueAccessor, UntypedFormGroup, ValidationErrors, Validator } from '@angular/forms';
import { FormControlConfig, OptionItem } from '../../models';
import * as i0 from "@angular/core";
export declare class CustomControlComponent implements ControlValueAccessor, Validator {
    /**Must assign it with instance of `AbstractControl`
     * @example
     * override control = new FormControl() 'or' new UntypedFormControl();
     * override control = new FormGroup() 'or' new UntypedFormGroup();
     * override control = new FormArray() 'or' new UntypedFormArray();
     */
    control?: AbstractControl;
    hostForm?: UntypedFormGroup;
    data?: FormControlConfig;
    hideErrorMessage?: boolean;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(control: AbstractControl<any, any>): ValidationErrors | null;
    markAsDirty(): void;
    markAsPristine(): void;
    markAsTouched(): void;
    markAsUntouched(): void;
    setErrors(errors: ValidationErrors | null): void;
    onOptionsGet(data: OptionItem[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomControlComponent, "custom-control", never, {}, {}, never, never, true, never>;
}
