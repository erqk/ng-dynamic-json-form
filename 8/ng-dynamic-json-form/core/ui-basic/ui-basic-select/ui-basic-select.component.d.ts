import { FormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicSelectComponent extends CustomControlComponent {
    control: FormControl<number | null>;
    onTouched: () => void;
    onChange: (_: any) => void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    updateControl(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicSelectComponent, "ui-basic-select", never, {}, {}, never, never, true, never>;
}
