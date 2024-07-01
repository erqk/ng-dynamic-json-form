import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { LanguageService } from './language-data.service';
import { LanguageType } from './language.type';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select
      class="doc-form-element !px-4"
      (change)="onLanguageSelect($event)"
      [value]="language$ | async"
    >
      <option value="en">English</option>
      <option value="zh-TW">中文</option>
    </select>
  `,
  styles: [],
})
export class LanguageSelectorComponent {
  private _langService = inject(LanguageService);

  language$ = this._langService.language$;

  onLanguageSelect(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const language = select.value;

    this._switchLanguage(language);
  }

  private _switchLanguage(language: LanguageType): void {
    this._langService
      .loadLanguageData$(language)
      .pipe(tap(() => this._langService.setLanguage(language)))
      .subscribe();
  }
}
