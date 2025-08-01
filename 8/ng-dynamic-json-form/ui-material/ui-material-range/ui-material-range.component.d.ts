import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialRangeComponent extends CustomControlComponent {
    control: FormControl<number | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialRangeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialRangeComponent, "ui-material-range", never, {}, {}, never, never, true, never>;
}
