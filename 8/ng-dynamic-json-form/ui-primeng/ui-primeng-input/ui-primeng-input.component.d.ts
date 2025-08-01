import { UntypedFormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiPrimengInputComponent extends CustomControlComponent {
    control: UntypedFormControl;
    onChange?: any;
    registerOnChange(fn: any): void;
    onInput(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengInputComponent, "ui-primeng-input", never, {}, {}, never, never, true, never>;
}
