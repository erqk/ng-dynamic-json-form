import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiPrimengRadioComponent extends CustomControlComponent {
    private _onChange?;
    control: FormControl<number | null>;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    updateControl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengRadioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengRadioComponent, "ui-primeng-radio", never, {}, {}, never, never, true, never>;
}
