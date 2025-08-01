import { AfterViewInit, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorConfig } from '../../models';
import { CustomErrorMessage } from '../custom-error-message/custom-error-message.abstract';
import * as i0 from "@angular/core";
export declare class ErrorMessageComponent implements AfterViewInit {
    private _internal_destroyRef;
    private _internal_formValidationService;
    private _customComponent;
    control?: AbstractControl;
    validators?: ValidatorConfig[];
    customComponent?: Type<CustomErrorMessage>;
    customTemplate?: TemplateRef<any>;
    componentAnchor: ViewContainerRef;
    errorMessages: string[];
    ngAfterViewInit(): void;
    private _injectComponent;
    private _getErrorMessages;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ErrorMessageComponent, "error-message", never, { "control": { "alias": "control"; "required": false; }; "validators": { "alias": "validators"; "required": false; }; "customComponent": { "alias": "customComponent"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
