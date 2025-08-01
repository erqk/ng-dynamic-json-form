import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiMaterialTextareaComponent extends CustomControlComponent {
    control: FormControl<string | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    onInput(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiMaterialTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiMaterialTextareaComponent, "ui-material-textarea", never, {}, {}, never, never, true, never>;
}
