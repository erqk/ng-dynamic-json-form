import { SimpleChanges, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { CustomFormLabel } from '../custom-form-label/custom-form-label.abstract';
import * as i0 from "@angular/core";
export declare class FormLabelComponent {
    private _destroyRef;
    private _viewInitialized;
    private _collapsibleElCssText;
    private _componentRef?;
    label?: string;
    layout?: FormControlConfig['layout'];
    props?: FormControlConfig['props'];
    collapsibleEl?: HTMLElement;
    /**
     * State comes from root, to overwrite all the collapsible state
     */
    state?: FormLayout['contentCollapsible'];
    customComponent?: Type<CustomFormLabel>;
    customTemplate?: TemplateRef<any>;
    componentAnchor?: ViewContainerRef;
    get styleDisplay(): "flex" | "inline-block" | null;
    get styleCursor(): "normal" | "pointer";
    onClick(): void;
    collapsible: boolean;
    expand: boolean;
    toggle: (value?: boolean) => void;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private _injectComponent;
    private _listenTransition;
    private _setElementHeight;
    private _initCollapsibleEl;
    private _setCollapseStyle;
    private _setExpandStyle;
    private get _collapsible();
    static ɵfac: i0.ɵɵFactoryDeclaration<FormLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormLabelComponent, "form-label", never, { "label": { "alias": "label"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "props": { "alias": "props"; "required": false; }; "collapsibleEl": { "alias": "collapsibleEl"; "required": false; }; "state": { "alias": "state"; "required": false; }; "customComponent": { "alias": "customComponent"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
