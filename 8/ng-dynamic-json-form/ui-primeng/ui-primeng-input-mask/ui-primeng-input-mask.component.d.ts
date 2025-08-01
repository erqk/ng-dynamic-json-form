import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import { InputText } from 'primeng/inputtext';
import * as i0 from "@angular/core";
export declare class UiPrimengInputMaskComponent extends CustomControlComponent {
    target?: InputText;
    control: FormControl<string | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengInputMaskComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengInputMaskComponent, "ui-primeng-input-mask", never, {}, {}, never, never, true, never>;
}
