import { OnChanges } from '@angular/core';
import { FormControlConfig } from '../models';
import * as i0 from "@angular/core";
export declare class ControlLayoutDirective implements OnChanges {
    private _el;
    controlLayout?: {
        type?: 'host' | 'label' | 'content' | 'formGroup' | 'description' | 'inputArea' | 'error';
        layout?: FormControlConfig['layout'];
    };
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlLayoutDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ControlLayoutDirective, "[controlLayout]", never, { "controlLayout": { "alias": "controlLayout"; "required": false; }; }, {}, never, never, true, never>;
}
