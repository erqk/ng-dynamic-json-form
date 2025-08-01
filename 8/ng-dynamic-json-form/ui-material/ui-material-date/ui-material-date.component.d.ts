import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialDateComponent extends CustomControlComponent {
    control: FormControl<Date | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialDateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialDateComponent, "ui-material-date", never, {}, {}, never, never, true, never>;
}
