import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { delay, filter, switchMap } from 'rxjs/operators';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { DocumentVersionService } from '../../services/document-version.service';

@Component({
  selector: 'app-document-version-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select [value]="currentVersion$ | async" (change)="changeVersion($event)">
      <ng-container *ngFor="let item of versions$ | async">
        <option value="{{ item.value }}">{{ item.label }}</option>
      </ng-container>
    </select>
  `,
  styles: [],
})
export class DocumentVersionSelectorComponent {
  private _router = inject(Router);
  private _docVersionService = inject(DocumentVersionService);
  private _langService = inject(LanguageDataService);

  versions$ = this._docVersionService.versions$;
  currentVersion$ = this._docVersionService.currentVersion$.pipe(delay(0));

  changeVersion(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const version = select.value;

    const { language$ } = this._langService;
    const indexPath = `assets/docs/${version}/index_${language$.value}.md`;

    this._docVersionService.currentVersion = version;
    this._docVersionService
      .firstContentPath$(indexPath)
      .pipe(
        filter((x) => x.length > 0),
        switchMap((x) => this._router.navigateByUrl(x))
      )
      .subscribe();
  }
}
