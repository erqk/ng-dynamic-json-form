import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { HOST_ORIGIN } from '../injection-tokens/host-origin.token';

export const absolutePathInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const hostOrigin =
    inject(HOST_ORIGIN, { optional: true }) ?? 'http://localhost:4201';

  if (!req.url.startsWith('http') && isPlatformServer(platformId)) {
    const url = req.url;
    req = req.clone({
      url: `${hostOrigin}/${url.startsWith('/') ? url.substring(1) : url}`,
    });
  }

  return next(req);
};
