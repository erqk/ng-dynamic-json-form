import { FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialCheckboxComponent extends CustomControlComponent {
    private _onChange?;
    control: FormArray<FormControl<any>>;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    toggle(e: MatCheckboxChange): void;
    onCheckboxChange(e: MatCheckboxChange, index: number): void;
    isChecked(val: any): boolean;
    get groupButtonsStyles(): string;
    private _addItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialCheckboxComponent, "ui-material-checkbox", never, {}, {}, never, never, true, never>;
}
