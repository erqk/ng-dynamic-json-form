import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private _http = inject(HttpClient);

  readonly currentVersion = 'v7';
  readonly versions$ = new BehaviorSubject<{ label: string; value: string }[]>(
    []
  );

  loadVersions$(): Observable<string[]> {
    return this._npmPackageVersions$().pipe(
      tap((x) => {
        this.versions$.next(
          x.map((x) => ({
            label: `v${x}`,
            value: `v${x.slice(0, 1)}`,
          }))
        );
      }),
      catchError(() => of(['Latest']))
    );
  }

  firstContentPath$(path: string): Observable<string> {
    return this._http.get(path, { responseType: 'text' }).pipe(
      map((x) => x.match(/(\.+\/){1,}.+/)?.[0]),
      map((x) => x?.replace(/(\.*\/){1,}/, 'docs/') ?? ''),
      catchError(() => of(''))
    );
  }

  private _npmPackageVersions$(): Observable<string[]> {
    return this._http
      .get('https://registry.npmjs.org/ng-dynamic-json-form', {
        responseType: 'json',
      })
      .pipe(
        map((x: any) => {
          const versions = x.versions;
          const versionsDetail = Object.values(versions);

          const nonDeprecatedVersions: string[] = versionsDetail
            .filter((x: any) => !x.deprecated)
            .map((x: any) => x.version);

          const majorVersions = nonDeprecatedVersions.reduce((acc, curr) => {
            const targetIndex = acc.findIndex((x) => x[0] === curr[0]);
            if (targetIndex < 0) acc.push(curr);
            else acc[targetIndex] = curr;
            return acc;
          }, [] as string[]);

          return majorVersions;
        })
      );
  }
}
