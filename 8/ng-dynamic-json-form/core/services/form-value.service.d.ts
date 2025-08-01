import { UntypedFormGroup } from '@angular/forms';
import { FormControlConfig } from '../models';
import { FormDisplayValue } from '../models/form-display-value.interface';
import * as i0 from "@angular/core";
export declare class FormValueService {
    patchForm(form: UntypedFormGroup | undefined, value: any): void;
    getFormDisplayValue(value: any, configs: FormControlConfig[]): FormDisplayValue;
    private _getKeyPreservedDisplayValue;
    private _getKeyMappedFormDisplayValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormValueService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormValueService>;
}
