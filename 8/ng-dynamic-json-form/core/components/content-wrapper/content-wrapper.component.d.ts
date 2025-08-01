import { AbstractControl } from '@angular/forms';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import * as i0 from "@angular/core";
export declare class ContentWrapperComponent {
    private _globalVariableService;
    config?: FormControlConfig;
    control?: AbstractControl;
    collapsibleState?: FormLayout['contentCollapsible'];
    descriptionPosition: "after" | "before" | undefined;
    hideErrors$: import("rxjs").BehaviorSubject<boolean | undefined>;
    showErrorsOnTouched: boolean;
    errorComponents: import("../../models").CustomErrorComponents | undefined;
    errorTemplates: import("../../models").CustomTemplates | undefined;
    errorComponentDefault: import("@angular/core").Type<import("ng-dynamic-json-form").CustomErrorMessage> | undefined;
    errorTemplateDefault: import("@angular/core").TemplateRef<any> | undefined;
    labelComponents: import("../../models").CustomLabelComponents | undefined;
    labelTemplates: import("../../models").CustomTemplates | undefined;
    labelComponentDefault: import("@angular/core").Type<import("ng-dynamic-json-form").CustomFormLabel> | undefined;
    labelTemplateDefault: import("@angular/core").TemplateRef<any> | undefined;
    renderErrorSection: boolean;
    get showErrors(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContentWrapperComponent, "content-wrapper", never, { "config": { "alias": "config"; "required": false; }; "control": { "alias": "control"; "required": false; }; "collapsibleState": { "alias": "collapsibleState"; "required": false; }; }, {}, never, ["*"], true, never>;
}
