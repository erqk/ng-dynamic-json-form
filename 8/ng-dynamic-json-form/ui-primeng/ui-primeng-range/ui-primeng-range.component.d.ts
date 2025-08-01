import { AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import { Slider } from 'primeng/slider';
import * as i0 from "@angular/core";
export declare class UiPrimengRangeComponent extends CustomControlComponent implements AfterViewInit {
    private _pendingValue;
    control: FormControl<number | null>;
    onChange?: any;
    sliderRef?: Slider;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiPrimengRangeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiPrimengRangeComponent, "ui-primeng-range", never, {}, {}, never, never, true, never>;
}
