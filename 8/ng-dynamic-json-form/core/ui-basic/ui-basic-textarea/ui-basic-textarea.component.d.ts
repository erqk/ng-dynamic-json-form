import { FormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicTextareaComponent extends CustomControlComponent {
    control: FormControl<string | null>;
    onChange?: any;
    registerOnChange(fn: any): void;
    onInput(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicTextareaComponent, "ui-basic-textarea", never, {}, {}, never, never, true, never>;
}
