import { FormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicInputMaskComponent extends CustomControlComponent {
    control: FormControl<string | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicInputMaskComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicInputMaskComponent, "ui-basic-input-mask", never, {}, {}, never, never, true, never>;
}
