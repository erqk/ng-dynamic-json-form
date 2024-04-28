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
    const source$ = () => {
      const cacheData = this._cache.find((x) => x.lang === _lang)?.data;
      return cacheData
        ? of(cacheData)
        : this._http.get(`assets/i18n/${_lang}.json`, {
            responseType: 'json',
          });
    };

    return source$().pipe(
      tap((x) => {
        if (!x) return;
        this.language$.next(_lang);
        this.i18nContent$.next(x);
        this._cache.push({ lang: _lang, data: x });
        this._userLanguage = _lang;
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

  private set _userLanguage(val: string) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('language', val);
  }

  private get _userLanguage(): LanguageType {
    if (typeof window === 'undefined') {
      return 'en';
    }

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
