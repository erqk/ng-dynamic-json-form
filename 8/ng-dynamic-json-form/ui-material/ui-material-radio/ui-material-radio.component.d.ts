import { UntypedFormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialRadioComponent extends CustomControlComponent {
    private _onChange?;
    control: UntypedFormControl;
    selectedIndex: number;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    onChange(i: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialRadioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialRadioComponent, "ui-material-radio", never, {}, {}, never, never, true, never>;
}
