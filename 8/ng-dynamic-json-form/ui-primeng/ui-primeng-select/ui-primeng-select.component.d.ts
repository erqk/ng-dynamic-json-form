import { UntypedFormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiPrimengSelectComponent extends CustomControlComponent {
    control: UntypedFormControl;
    onTouched: () => void;
    onChange: (_: any) => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengSelectComponent, "ui-primeng-select", never, {}, {}, never, never, true, never>;
}
