import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageDataService {
  language$ = new BehaviorSubject<string>('en');
  languageData$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  setLanguage$(lang?: string): Observable<any> {
    const _lang = lang ?? window.localStorage.getItem('language') ?? 'en';

    return this.http
      .get(`assets/i18n/${_lang}.json`, { responseType: 'json' })
      .pipe(
        tap((x) => {
          this.language$.next(_lang);
          this.languageData$.next(x);
          window.localStorage.setItem('language', _lang);
        })
      );
  }
}
