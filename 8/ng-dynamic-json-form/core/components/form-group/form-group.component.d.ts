import { OnChanges, QueryList, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { FormControlComponent } from '../form-control/form-control.component';
import * as i0 from "@angular/core";
export declare class FormGroupComponent implements OnChanges {
    private _el;
    private _globalVariableService;
    configs?: FormControlConfig[];
    collapsibleState?: FormLayout['contentCollapsible'];
    parentId?: string;
    parentForm: UntypedFormGroup;
    rootClass?: string;
    rootStyles?: string;
    formGroupRefs?: QueryList<FormGroupComponent>;
    formControlRefs?: QueryList<FormControlComponent>;
    customComponents: import("../../models").CustomComponents | undefined;
    ngOnChanges(changes: SimpleChanges): void;
    updateStatus(status: 'dirty' | 'pristine' | 'touched' | 'untouched'): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormGroupComponent, "form-group", never, { "configs": { "alias": "configs"; "required": false; }; "collapsibleState": { "alias": "collapsibleState"; "required": false; }; "parentId": { "alias": "parentId"; "required": false; }; "parentForm": { "alias": "parentForm"; "required": false; }; "rootClass": { "alias": "rootClass"; "required": false; }; "rootStyles": { "alias": "rootStyles"; "required": false; }; }, {}, never, never, true, never>;
}
