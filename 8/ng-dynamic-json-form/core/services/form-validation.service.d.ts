import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidatorConfig } from '../models';
import * as i0 from "@angular/core";
export declare class FormValidationService {
    private _globalVariableService;
    getErrorMessages$(control: AbstractControl | null | undefined, validators?: ValidatorConfig[]): Observable<string[]>;
    getValidators(input: ValidatorConfig[] | undefined): ValidatorFn[];
    getAsyncValidators(input: ValidatorConfig[] | undefined): AsyncValidatorFn[];
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
    private _getErrorMessages;
    private _getConfigFromErrorKey;
    private _getValidatorValue;
    /**
     * Get validatorFn from either validatorFn or factory function that return a validatorFn.
     * If it's a factory function, return the validatorFn instead.
     *
     * @param validatorConfig
     * @param validatorFn
     */
    private _getValidatorFn;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormValidationService>;
}
