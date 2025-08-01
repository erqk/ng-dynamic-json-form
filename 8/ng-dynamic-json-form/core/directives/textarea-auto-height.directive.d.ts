import * as i0 from "@angular/core";
export declare class TextareaAutHeightDirective {
    private _el;
    private _hostEl?;
    autoResize: boolean;
    ngAfterViewInit(): void;
    onInput(): void;
    private _setHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextareaAutHeightDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TextareaAutHeightDirective, "[textareaAutoHeight]", never, { "autoResize": { "alias": "autoResize"; "required": false; }; }, {}, never, never, true, never>;
}
