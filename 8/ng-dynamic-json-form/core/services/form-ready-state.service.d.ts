import { BehaviorSubject } from 'rxjs';
import { FormControlConfig } from '../models';
import * as i0 from "@angular/core";
export declare class FormReadyStateService {
    optionsReady$: BehaviorSubject<boolean>;
    private _optionsLoadingCount;
    optionsLoading(add: boolean): void;
    resetState(): void;
    haveOptionsToWait(configs: FormControlConfig[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormReadyStateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormReadyStateService>;
}
