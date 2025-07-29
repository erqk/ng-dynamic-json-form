import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, fromEvent, merge, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowEventService {
  private platformId = inject(PLATFORM_ID);

  readonly keyUp$ = new Subject<KeyboardEvent>();
  readonly pointerUp$ = new Subject<PointerEvent>();

  start$(): Observable<any> {
    if (isPlatformServer(this.platformId)) {
      return EMPTY;
    }

    return merge(
      this.event$('keyup').pipe(tap((x) => this.keyUp$.next(x))),
      this.event$('pointerup').pipe(tap((x) => this.pointerUp$.next(x))),
    );
  }

  private event$(name: string): Observable<any> {
    return fromEvent(window, name, { passive: true });
  }
}
