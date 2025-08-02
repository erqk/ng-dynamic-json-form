import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private http = inject(HttpClient);

  versions = signal<string[]>([]);
  currentVersion = computed(() => this.versions()[0]);

  loadVersions$(): Observable<string[]> {
    return this.collectVersionsFromDocIndex$().pipe(
      tap((x) => {
        this.versions.set(x.map((x) => `v${x}`));
      }),
    );
  }

  private collectVersionsFromDocIndex$(): Observable<string[]> {
    return this.http.get('assets/docs/index.md', { responseType: 'text' }).pipe(
      map((x) => {
        const matchItems = x.match(/^## (?!.*\(deprecated\)).*$/gm) || [];
        const result = matchItems
          .map((x) => x.split('##')[1].trim()[0])
          .sort()
          .reverse();

        return result;
      }),
    );
  }

  private npmPackageVersions$(): Observable<string[]> {
    return this.http
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
        }),
      );
  }
}
