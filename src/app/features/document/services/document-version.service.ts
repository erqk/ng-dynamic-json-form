import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentVersionService {
  versions = ['3.3.x', '3.0.x', '2.x.x', '1.x.x'];

  private _currentVersion$ = new BehaviorSubject<string>(this.versions[0]);

  setVersion(version: string): void {
    if (!this.versions.includes(version)) {
      return;
    }

    this._currentVersion$.next(version);
    window.localStorage.setItem('docs-version', version);
  }

  get currentVersion$(): Observable<string> {
    return this._currentVersion$.asObservable();
  }

  get currentVersion(): string {
    return this._currentVersion$.value;
  }
}
