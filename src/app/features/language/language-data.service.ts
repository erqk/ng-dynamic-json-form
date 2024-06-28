import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState, inject, makeStateKey } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { LanguageType } from './language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageDataService {
  private _http = inject(HttpClient);
  private _transferState = inject(TransferState);
  private _location = inject(Location);
  private _defaultLanguage: LanguageType = 'en';
  private _language$ = new BehaviorSubject<LanguageType>(this._defaultLanguage);
  private _cache: { lang: string; data: any }[] = [];

  languageList: LanguageType[] = ['zh-TW', 'en'];
  i18nContent$ = new BehaviorSubject<any>({});

  setLanguage(lang: LanguageType): void {
    if (lang === this._language$.value) return;
    this._language$.next(lang);
  }

  setCurrentLanguage(): void {
    this.setLanguage(this.currentLanguage);
  }

  loadLanguageData$(lang?: LanguageType): Observable<any> {
    const _lang = lang ?? this.currentLanguage;
    const url = `assets/i18n/${_lang}.json`;
    const key = makeStateKey<string>(url);
    const cacheData = this._cache.find((x) => x.lang === _lang)?.data;

    const source$ = () => {
      if (this._transferState.hasKey(key)) {
        return of(this._transferState.get(key, ''));
      }

      if (cacheData) {
        return of(cacheData);
      }
      return this._http.get(url, {
        responseType: 'json',
      });
    };

    return source$().pipe(
      tap((x) => {
        if (!x) return;
        this.setLanguage(_lang);
        this.i18nContent$.next(x);
        this._cache.push({ lang: _lang, data: x });
        this._userLanguage = _lang;
        this._transferState.set(key, x);
      })
    );
  }

  get language$(): Observable<LanguageType> {
    return this._language$.asObservable();
  }

  get languageFromUrl(): string | undefined {
    const url = this._location.path();
    const langFromUrl = url
      .match(/_.+\.md$/)?.[0]
      .substring(1)
      .replace('.md', '');

    return langFromUrl;
  }

  get selectedLanguage(): LanguageType {
    return this._language$.value;
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
