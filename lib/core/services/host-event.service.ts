import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, fromEvent, merge, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HostEventService {
  private platformId = inject(PLATFORM_ID);

  readonly focusOut$ = new Subject<FocusEvent>();
  readonly keyUp$ = new Subject<KeyboardEvent>();
  readonly keyDown$ = new Subject<KeyboardEvent>();
  readonly pointerUp$ = new Subject<PointerEvent>();
  readonly pointerDown$ = new Subject<PointerEvent>();

  start$(hostElement: HTMLElement): Observable<any> {
    if (this.isServer) {
      return EMPTY;
    }

    return merge(
      this.event$(hostElement, 'focusout', this.focusOut$),
      this.event$(hostElement, 'keyup', this.keyUp$),
      this.event$(hostElement, 'keydown', this.keyDown$),
      this.event$(hostElement, 'pointerup', this.pointerUp$),
      this.event$(hostElement, 'pointerdown', this.pointerDown$),
    );
  }

  private event$(
    target: HTMLElement,
    name: string,
    subject: Subject<any>,
  ): Observable<any> {
    if (this.isServer) {
      return EMPTY;
    }

    return fromEvent(target, name, { passive: true }).pipe(
      tap((x) => subject.next(x)),
    );
  }

  private get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}
