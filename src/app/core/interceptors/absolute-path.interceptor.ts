import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { HOST_ORIGIN } from '../injection-tokens/host-origin.token';

export const absolutePathInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  // Use `http://localhost:4201` as fallback value, otherwise prerender will failed.
  const hostOrigin = inject(HOST_ORIGIN, { optional: true }) ?? 'http://localhost:4201';

  if (!req.url.startsWith('http')) {
    const url = req.url.startsWith('/') ? req.url.substring(1) : req.url;
    req = req.clone({
      url: `${
        isPlatformServer(platformId) ? hostOrigin : window.location.origin
      }/${url}`,
    });
  }

  return next(req);
};
