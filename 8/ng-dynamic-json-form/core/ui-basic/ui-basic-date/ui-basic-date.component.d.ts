import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import * as i0 from "@angular/core";
export declare class UiBasicDateComponent extends CustomControlComponent implements OnInit {
    private _locale;
    private _onChange?;
    dateSettings: {
        min: string;
        max: string;
    };
    control: FormGroup<{
        date: FormControl<string | null>;
        time: FormControl<string | null>;
    }>;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    ngOnInit(): void;
    updateControl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiBasicDateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiBasicDateComponent, "ui-basic-date", never, {}, {}, never, never, true, never>;
}
