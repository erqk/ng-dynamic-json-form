import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, finalize, tap } from 'rxjs';

interface RequestResponse {
  src: string;
  data$: Subject<Object>;
  body?: any;
}

interface RequestParams {
  src: string;
  method: 'POST' | 'GET';
  headers?: any;
  body?: any;
}

@Injectable()
export class HttpRequestCacheService {
  private _requests: RequestResponse[] = [];
  private _http = inject(HttpClient);

  request$(params: RequestParams): Observable<Object> {
    const { src, method, headers, body } = params;
    const source$ =
      method === 'GET'
        ? this._http.get(src, { headers })
        : this._http.post(src, body ?? {}, { headers });

    const sameRequest = this._prevSameRequest(params);

    if (sameRequest) {
      if (!sameRequest.data$.closed) return sameRequest.data$;
      sameRequest.data$ = new Subject<Object>();
    } else {
      this._requests.push({
        src,
        data$: new Subject<Object>(),
        body,
      });
    }

    return source$.pipe(
      tap((x) => {
        const sameRequest = this._prevSameRequest(params);
        !sameRequest?.data$.closed && sameRequest?.data$.next(x);
      }),
      finalize(() => {
        const sameRequest = this._prevSameRequest(params);
        sameRequest?.data$.complete();
        sameRequest?.data$.unsubscribe();
      })
    );
  }

  reset(): void {
    this._requests
      .filter((x) => !x.data$.closed)
      .forEach(({ data$ }) => {
        data$.next([]);
        data$.complete();
        data$.unsubscribe();
      });

    this._requests = [];
  }

  private _prevSameRequest({
    src,
    method,
    body,
  }: RequestParams): RequestResponse | undefined {
    const result = this._requests.find((x) => {
      if (method === 'POST' && body) {
        const sameBody = JSON.stringify(body) === JSON.stringify(x.body);
        return x.src === src && sameBody;
      }

      return x.src === src;
    });

    return result;
  }
}
