import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { LanguageType } from '../language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageDataService {
  private _http = inject(HttpClient);
  private _location = inject(Location);
  private _cache: { lang: string; data: any }[] = [];

  languageList: LanguageType[] = ['zh-TW', 'en'];
  defaultLanguage: LanguageType = 'en';
  language$ = new BehaviorSubject<LanguageType>(this.defaultLanguage);
  i18nContent$ = new BehaviorSubject<any>({});

  loadLanguageData$(lang?: LanguageType): Observable<any> {
    const _lang = lang ?? this.currentLanguage;
    const timestamp = new Date().getTime();
    const cache = this._cache.find((x) => x.lang === _lang)?.data;
    const source$ = !cache
      ? this._http.get(`assets/i18n/${_lang}.json?q=${timestamp}`, {
          responseType: 'json',
        })
      : of(cache);

    return source$.pipe(
      tap((x) => {
        if (!x) return;
        this.language$.next(_lang);
        this.i18nContent$.next(x);
        this._cache.push({ lang: _lang, data: x });
        window.localStorage.setItem('language', _lang);
      })
    );
  }

  get languageFromUrl(): string | undefined {
    const url = this._location.path();
    const langFromUrl = url
      .match(/_.+\.md$/)?.[0]
      .substring(1)
      .replace('.md', '');

    return langFromUrl;
  }

  get currentLanguage(): LanguageType {
    return this.languageFromUrl ?? this._userLanguage;
  }

  private get _userLanguage(): LanguageType {
    const browserLanguage = window.navigator.language;
    const savedLanguage = window.localStorage.getItem('language');
    const lang = savedLanguage ?? browserLanguage;

    if (lang.includes('en')) {
      return 'en';
    }

    if (lang.includes('zh')) {
      return 'zh-TW';
    }

    return 'en';
  }
}
