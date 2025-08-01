import { UntypedFormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicInputComponent extends CustomControlComponent {
    control: UntypedFormControl;
    onChange?: any;
    registerOnChange(fn: any): void;
    onInput(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicInputComponent, "ui-basic-input", never, {}, {}, never, never, true, never>;
}
