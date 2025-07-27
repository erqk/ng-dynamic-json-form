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
  private requests: RequestResponse[] = [];
  private http = inject(HttpClient);

  request$(params: RequestParams): Observable<Object> {
    const { src, method, headers, body } = params;
    const source$ =
      method === 'GET'
        ? this.http.get(src, { headers })
        : this.http.post(src, body ?? {}, { headers });

    const sameRequest = this.prevSameRequest(params);

    if (sameRequest) {
      if (!sameRequest.data$.closed) return sameRequest.data$;
      sameRequest.data$ = new Subject<Object>();
    } else {
      this.requests.push({
        src,
        data$: new Subject<Object>(),
        body,
      });
    }

    return source$.pipe(
      tap((x) => {
        const sameRequest = this.prevSameRequest(params);
        !sameRequest?.data$.closed && sameRequest?.data$.next(x);
      }),
      finalize(() => {
        const sameRequest = this.prevSameRequest(params);
        sameRequest?.data$.complete();
        sameRequest?.data$.unsubscribe();
      })
    );
  }

  reset(): void {
    this.requests
      .filter((x) => !x.data$.closed)
      .forEach(({ data$ }) => {
        data$.next([]);
        data$.complete();
        data$.unsubscribe();
      });

    this.requests = [];
  }

  private prevSameRequest({
    src,
    method,
    body,
  }: RequestParams): RequestResponse | undefined {
    const result = this.requests.find((x) => {
      if (method === 'POST' && body) {
        const sameBody = JSON.stringify(body) === JSON.stringify(x.body);
        return x.src === src && sameBody;
      }

      return x.src === src;
    });

    return result;
  }
}
