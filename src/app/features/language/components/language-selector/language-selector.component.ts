import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageDataService } from '../../services/language-data.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `<select
    (change)="switchLanguage($event)"
    [value]="language$.value"
  >
    <option value="en">English</option>
    <option value="zh-TW">繁體中文</option>
  </select>`,
  styles: [],
})
export class LanguageSelectorComponent {
  language$ = this._languageDataService.language$;

  constructor(private _languageDataService: LanguageDataService) {}

  switchLanguage(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const language = select.value;

    this._languageDataService.setLanguage$(language).subscribe();
  }
}
