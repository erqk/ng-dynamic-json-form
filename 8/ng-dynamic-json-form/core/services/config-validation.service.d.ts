import { FormControlConfig } from '../models';
import { ConfigValidationErrors } from '../models/config-validation-errors.interface';
import * as i0 from "@angular/core";
export declare class ConfigValidationService {
    private _configMappingService;
    validateAndGetConfig(input: string | FormControlConfig[] | undefined): {
        configs: FormControlConfig[] | null;
        errors?: ConfigValidationErrors[];
    };
    private _getBeautifyErrors;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigValidationService>;
}
