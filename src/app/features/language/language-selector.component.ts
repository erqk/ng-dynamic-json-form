import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LanguageService } from './language-data.service';
import { LanguageType } from './language.type';

@Component({
  selector: 'app-language-selector',
  imports: [CommonModule],
  template: `
    <select
      class="doc-form-element !px-4"
      (change)="onLanguageSelect($event)"
      [value]="language()"
    >
      <option value="en">English</option>
      <option value="zh-TW">中文</option>
    </select>
  `,
  styles: [],
})
export class LanguageSelectorComponent {
  private langService = inject(LanguageService);

  language = this.langService.selectedLanguage;

  onLanguageSelect(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const language = select.value;

    this.switchLanguage(language);
  }

  private switchLanguage(language: LanguageType): void {
    this.langService.selectedLanguage.set(language);
    this.langService.loadLanguageData$(language).subscribe();
  }
}
