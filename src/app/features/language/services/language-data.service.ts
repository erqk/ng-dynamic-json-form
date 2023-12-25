import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LanguageType } from '../language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageDataService {
  private _http = inject(HttpClient);
  private _location = inject(Location);

  languageList: LanguageType[] = ['zh-TW', 'en'];
  defaultLanguage: LanguageType = 'en';
  language$ = new BehaviorSubject<LanguageType>(this.defaultLanguage);
  i18nContent$ = new BehaviorSubject<any>({});

  get languageFromUrl(): string | undefined {
    const url = this._location.path();
    const langFromUrl = url
      .match(/_.+\.md$/)?.[0]
      .substring(1)
      .replace('.md', '');

    return langFromUrl;
  }

  loadLanguageData$(lang?: LanguageType): Observable<any> {
    const _lang =
      lang ??
      this.languageFromUrl ??
      window.localStorage.getItem('language') ??
      'en';

    const timestamp = new Date().getTime();

    return this._http
      .get(`assets/i18n/${_lang}.json?q=${timestamp}`, { responseType: 'json' })
      .pipe(
        tap((x) => {
          if (!x) return;
          this.language$.next(_lang);
          this.i18nContent$.next(x);
          window.localStorage.setItem('language', _lang);
        })
      );
  }
}
