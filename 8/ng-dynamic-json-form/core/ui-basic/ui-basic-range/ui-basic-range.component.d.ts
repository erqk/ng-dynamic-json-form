import { FormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicRangeComponent extends CustomControlComponent {
    control: FormControl<number | null>;
    tickMarks: any[];
    onChange?: any;
    registerOnChange(fn: any): void;
    ngOnInit(): void;
    get valuePosition(): string;
    private _getTickMarksCount;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicRangeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicRangeComponent, "ui-basic-range", never, {}, {}, never, never, true, never>;
}
