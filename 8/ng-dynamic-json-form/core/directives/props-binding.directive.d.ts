import * as i0 from "@angular/core";
export declare class PropsBindingDirective {
    private _injectionTokens;
    private _injector;
    private _cd;
    private _el;
    /**
     * Must ensure the view is initialized before applying any properties binding
     */
    private _isViewInitialized;
    propsBinding?: {
        props: any;
        key?: string;
        omit?: string[];
    }[];
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    private _bindProperties;
    private updateComponentProperty;
    private hasProperty;
    private isValidHtmlAttribute;
    static ɵfac: i0.ɵɵFactoryDeclaration<PropsBindingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PropsBindingDirective, "[propsBinding]", never, { "propsBinding": { "alias": "propsBinding"; "required": false; }; }, {}, never, never, true, never>;
}
