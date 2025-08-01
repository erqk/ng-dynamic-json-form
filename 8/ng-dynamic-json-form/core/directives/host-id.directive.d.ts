import * as i0 from "@angular/core";
export declare class HostIdDirective {
    private _el;
    hostId?: {
        parentId?: string;
        controlName?: string;
    };
    ngOnChanges(): void;
    private get _hostId();
    static ɵfac: i0.ɵɵFactoryDeclaration<HostIdDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<HostIdDirective, "[hostId]", never, { "hostId": { "alias": "hostId"; "required": false; }; }, {}, never, never, true, never>;
}
