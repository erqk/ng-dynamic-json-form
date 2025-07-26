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
  private langService = inject(LanguageService);

  language$ = this.langService.language$;

  onLanguageSelect(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const language = select.value;

    this.switchLanguage(language);
  }

  private switchLanguage(language: LanguageType): void {
    this.langService
      .loadLanguageData$(language)
      .pipe(tap(() => this.langService.setLanguage(language)))
      .subscribe();
  }
}
