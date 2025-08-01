import { FormArray, FormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicCheckboxComponent extends CustomControlComponent {
    private _onChange?;
    control: FormArray<FormControl<any>>;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    toggle(e: Event): void;
    onCheckboxChange(e: Event, index: number): void;
    isChecked(val: any): boolean;
    get groupButtonsStyles(): string;
    private _addItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicCheckboxComponent, "ui-basic-checkbox", never, {}, {}, never, never, true, never>;
}
