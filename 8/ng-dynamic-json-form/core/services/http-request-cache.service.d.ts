import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface RequestParams {
    src: string;
    method: 'POST' | 'GET';
    headers?: any;
    body?: any;
}
export declare class HttpRequestCacheService {
    private _requests;
    private _http;
    request$(params: RequestParams): Observable<Object>;
    reset(): void;
    private _prevSameRequest;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpRequestCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpRequestCacheService>;
}
export {};
