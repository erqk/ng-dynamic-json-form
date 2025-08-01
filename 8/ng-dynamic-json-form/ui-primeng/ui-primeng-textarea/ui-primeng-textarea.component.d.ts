import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
export declare class UiPrimengTextareaComponent extends CustomControlComponent {
    control: FormControl<string | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    onInput(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengTextareaComponent, "ui-primeng-textarea", never, {}, {}, never, never, true, never>;
}
