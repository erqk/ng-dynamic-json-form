import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiPrimengCheckboxComponent extends CustomControlComponent {
    control: FormControl<any>;
    onChange?: any;
    registerOnChange(fn: any): void;
    get groupButtonsStyles(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengCheckboxComponent, "ui-primeng-checkbox", never, {}, {}, never, never, true, never>;
}
