import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialSwitchComponent extends CustomControlComponent {
    control: FormControl<boolean | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialSwitchComponent, "ui-material-switch", never, {}, {}, never, never, true, never>;
}
