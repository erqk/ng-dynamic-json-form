import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicRadioComponent extends CustomControlComponent {
    private _onChange?;
    selectedIndex: number;
    isDisabled: boolean;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onChange(i: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicRadioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicRadioComponent, "ui-basic-radio", never, {}, {}, never, never, true, never>;
}
