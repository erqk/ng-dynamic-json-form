import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Subject, filter, finalize, tap } from 'rxjs';

const requests: { src: string; data: Subject<any>; params?: any }[] = [];

export const httpCacheInterceptor: HttpInterceptorFn = (req, next) => {
  const prevSameRequest = () => {
    return requests.find(
      (x) =>
        x.src === req.url &&
        JSON.stringify(x.params) === JSON.stringify(req.body)
    );
  };

  const sameRequest = prevSameRequest();

  if (sameRequest) {
    if (!sameRequest.data.closed) return sameRequest.data;
    sameRequest.data = new Subject<any>();
  }

  requests.push({
    src: req.url,
    data: new Subject<any>(),
    params: req.body,
  });

  return next(req).pipe(
    filter((x) => x instanceof HttpResponse),
    tap((x) => {
      const r = prevSameRequest();
      !r?.data.closed && r?.data.next(x ?? null);
    }),
    finalize(() => {
      const r = prevSameRequest();
      r?.data.complete();
      r?.data.unsubscribe();
    })
  );
};
