import { Location, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  PLATFORM_ID,
  TransferState,
  inject,
  makeStateKey,
} from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HOST_ORIGIN } from 'src/app/core/injection-tokens/x-forwared-host.token';
import { LanguageType } from '../language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageDataService {
  private _http = inject(HttpClient);
  private _platformId = inject(PLATFORM_ID);
  private _hostOrigin = isPlatformServer(this._platformId)
    ? inject(HOST_ORIGIN, { optional: true })
    : window.location.origin;
  private _location = inject(Location);
  private _transferState = inject(TransferState);
  private _cache: { lang: string; data: any }[] = [];

  languageList: LanguageType[] = ['zh-TW', 'en'];
  defaultLanguage: LanguageType = 'en';
  language$ = new BehaviorSubject<LanguageType>(this.defaultLanguage);
  i18nContent$ = new BehaviorSubject<any>({});

  loadLanguageData$(lang?: LanguageType): Observable<any> {
    const _lang = lang ?? this.currentLanguage;
    const stateKey = makeStateKey<string>(_lang);

    const source$ = () => {
      const cacheFound = this._cache.find((x) => x.lang === _lang)?.data;
      const stateFound = this._transferState.get(stateKey, null);

      if (stateFound) return of(stateFound);
      if (cacheFound) return of(cacheFound);
      return this._http.get(`${this._hostOrigin}/assets/i18n/${_lang}.json`, {
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

        if (isPlatformServer(this._platformId)) {
          this._transferState.set(stateKey, x);
        }
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
