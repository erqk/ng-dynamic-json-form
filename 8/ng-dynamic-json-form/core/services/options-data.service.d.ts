import { Observable } from 'rxjs';
import { OptionItem, OptionSourceConfig } from '../models';
import * as i0 from "@angular/core";
export declare class OptionsDataService {
    private _globalVariableService;
    private _httpRequestCacheService;
    private _cancelAll$;
    /**
     * @param srcConfig @see OptionSourceConfig
     * @param valueChangesCallback The callback after `valueChanges` is called
     */
    getOptions$(srcConfig: OptionSourceConfig, valueChangesCallback: () => void): Observable<OptionItem[]>;
    cancelAllRequest(): void;
    onDestroy(): void;
    private _getOptions$;
    private _getOptionsByFilter$;
    private _getOptionsOnTrigger$;
    /**The `valueChanges` of trigger control */
    private _onTriggerControlChanges$;
    private _mapData;
    private _getMappedSrc;
    private _mapBodyValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionsDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OptionsDataService>;
}
