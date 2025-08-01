import { FormControlConfig } from '../models';
import * as i0 from "@angular/core";
export declare class ConfigMappingService {
    getCorrectedConfig(input: FormControlConfig): FormControlConfig;
    private _getFallbackValue;
    private _getFormControlName;
    private _mapInputMask;
    private _parseStringValue;
    /**https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format */
    private _isIsoDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigMappingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigMappingService>;
}
