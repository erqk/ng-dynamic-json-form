import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageType } from './language.type';
import { LanguageDataService } from './language-data.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select
      class="doc-form-element !px-4"
      (change)="onLanguageSelect($event)"
      [value]="language$.value"
    >
      <option value="en">English</option>
      <option value="zh-TW">中文</option>
    </select>
  `,
  styles: [],
})
export class LanguageSelectorComponent {
  private _languageDataService = inject(LanguageDataService);
  private _docsLoaderService = inject(DocsLoaderService);

  language$ = this._languageDataService.language$;

  onLanguageSelect(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const language = select.value;

    this._switchLanguage(language);
  }

  private _switchLanguage(language: LanguageType): void {
    this._languageDataService
      .loadLanguageData$(language)
      .pipe(tap(() => this._docsLoaderService.updateUrl()))
      .subscribe();
  }
}
