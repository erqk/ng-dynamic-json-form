import { Location, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { HOST_ORIGIN } from 'src/app/core/injection-tokens/x-forwared-host.token';

@Injectable({
  providedIn: 'root',
})
export class DocumentVersionService {
  private _http = inject(HttpClient);
  private _platformId = inject(PLATFORM_ID);
  private _hostOrigin = isPlatformServer(this._platformId)
    ? inject(HOST_ORIGIN, { optional: true })
    : window.location.origin;
  private _location = inject(Location);
  private _currentVersion$ = new BehaviorSubject<string>('');

  versions$ = new BehaviorSubject<{ label: string; value: string }[]>([]);

  loadVersions$(): Observable<string[]> {
    const path = `${this._hostOrigin}/assets/docs/index.md`;

    return this._http.get(path, { responseType: 'text' }).pipe(
      map((x) => {
        const versions =
          x.match(/(##)\s(\d\.){1,}(\d*)\s*(\(deprecated\))*/g) ||
          ([] as string[]);

        return versions
          .filter((x) => x.indexOf('deprecated') < 0)
          .map((x) => x.split('##')[1].trim());
      }),
      tap((x) => {
        this.versions$.next(
          x.map((x) => ({
            label: `v${x}`,
            value: `v${x.slice(0, 1)}`,
          }))
        );
        this._currentVersion$.next(this.versionFromUrl || this.latestVersion);
      })
    );
  }

  firstContentPath$(path: string): Observable<string> {
    return this._http.get(path, { responseType: 'text' }).pipe(
      map((x) => x.match(/(\.+\/){1,}.+/)?.[0]),
      map((x) => x?.replace(/(\.*\/){1,}/, 'docs/') ?? ''),
      catchError(() => of(''))
    );
  }

  get currentVersion$(): Observable<string> {
    return this._currentVersion$.asObservable();
  }

  get currentVersion(): string {
    return this._currentVersion$.value;
  }

  set currentVersion(value: string) {
    this._currentVersion$.next(value);
  }

  get latestVersion(): string {
    return this.versions$.value
      .map((x) => x.value)
      .sort()
      .reverse()[0];
  }

  get prevVersion(): string {
    return this.versions$.value
      .map((x) => x.value)
      .sort()
      .reverse()[1];
  }

  get versionFromUrl(): string | undefined {
    const urls = this._location.path().split('#')[0].split('?')[0].split('/');
    const docIndex = urls.findIndex((x) => x === 'docs');
    const version = docIndex > -1 ? urls[docIndex + 1] : undefined;

    return version;
  }
}
