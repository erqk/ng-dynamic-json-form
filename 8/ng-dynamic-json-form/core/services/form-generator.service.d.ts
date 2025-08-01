import { UntypedFormGroup } from '@angular/forms';
import { FormControlConfig } from '../models/form-control-config.interface';
import * as i0 from "@angular/core";
export declare class FormGeneratorService {
    private _formValidationService;
    generateFormGroup(data: FormControlConfig[]): UntypedFormGroup;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormGeneratorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormGeneratorService>;
}
