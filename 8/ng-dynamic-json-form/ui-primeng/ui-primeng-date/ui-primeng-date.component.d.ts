import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiPrimengDateComponent extends CustomControlComponent {
    private _onChange?;
    control: FormControl<Date | null>;
    registerOnChange(fn: any): void;
    updateControl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengDateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengDateComponent, "ui-primeng-date", never, {}, {}, never, never, true, never>;
}
