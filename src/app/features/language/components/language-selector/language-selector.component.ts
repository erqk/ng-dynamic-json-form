import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { DocumentLoaderService } from 'src/app/features/document/services/document-loader.service';
import { LanguageType } from '../../language.type';
import { LanguageDataService } from '../../services/language-data.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select (change)="onLanguageSelect($event)" [value]="language$.value">
      <option value="en">English</option>
      <option value="zh-TW">繁體中文</option>
    </select>
  `,
  styles: [],
})
export class LanguageSelectorComponent {
  private _languageDataService = inject(LanguageDataService);
  private _docLoaderService = inject(DocumentLoaderService);

  language$ = this._languageDataService.language$;

  onLanguageSelect(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const language = select.value;

    this._switchLanguage(language);
  }

  private _switchLanguage(language: LanguageType): void {
    this._languageDataService
      .loadLanguageData$(language)
      .pipe(tap(() => this._docLoaderService.updateUrl()))
      .subscribe();
  }
}
