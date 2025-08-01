import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialSelectComponent extends CustomControlComponent {
    private _onChange?;
    control: FormControl<number | null>;
    onTouched: () => void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    updateControl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialSelectComponent, "ui-material-select", never, {}, {}, never, never, true, never>;
}
