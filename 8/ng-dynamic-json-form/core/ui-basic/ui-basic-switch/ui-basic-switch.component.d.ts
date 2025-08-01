import { FormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicSwitchComponent extends CustomControlComponent {
    private _onChange?;
    control: FormControl<boolean | null>;
    registerOnChange(fn: any): void;
    updateControl(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicSwitchComponent, "ui-basic-switch", never, {}, {}, never, never, true, never>;
}
