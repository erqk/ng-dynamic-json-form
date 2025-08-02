import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  TransferState,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { LanguageType } from './language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private location = inject(Location);
  private DEFAULT_LANGUAGE: LanguageType = 'en';
  private cache: { lang: string; data: any }[] = [];

  selectedLanguage = signal<LanguageType>(this.DEFAULT_LANGUAGE);

  languageList: LanguageType[] = ['zh-TW', 'en'];
  i18nContent$ = new BehaviorSubject<any>({});

  setCurrentLanguage(): void {
    this.selectedLanguage.set(this.currentLanguage);
  }

  loadLanguageData$(lang?: LanguageType): Observable<any> {
    const _lang = lang ?? this.currentLanguage;
    const url = `assets/i18n/${_lang}.json`;
    const key = makeStateKey<string>(url);
    const cacheData = this.cache.find((x) => x.lang === _lang)?.data;

    const source$ = () => {
      if (this.transferState.hasKey(key)) {
        return of(this.transferState.get(key, ''));
      }

      if (cacheData) {
        return of(cacheData);
      }
      return this.http.get(url, {
        responseType: 'json',
      });
    };

    return source$().pipe(
      tap((x) => {
        if (!x) {
          return;
        }

        this.i18nContent$.next(x);
        this.cache.push({ lang: _lang, data: x });
        this._userLanguage = _lang;
        this.transferState.set(key, x);
      }),
    );
  }

  get languageFromUrl(): string | undefined {
    const url = this.location.path();
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
