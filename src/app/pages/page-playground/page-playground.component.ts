import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { AngularSplitModule, IOutputData } from 'angular-split';
import {
  FormControlConfig,
  NgDynamicJsonFormComponent,
} from 'ng-dynamic-json-form';
import { combineLatest, debounceTime, map } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { DocumentVersionService } from 'src/app/features/document/services/document-version.service';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { PlaygroundEditorComponent } from 'src/app/features/playground/components/playground-editor/playground-editor.component';
import { PlaygroundFormInfoComponent } from 'src/app/features/playground/components/playground-form-info/playground-form-info.component';
import { PlaygroundTemplateListComponent } from 'src/app/features/playground/components/playground-template-list/playground-template-list.component';
import { PlaygroundTemplateDataService } from 'src/app/features/playground/services/playground-template-data.service';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-playground-new',
  standalone: true,
  imports: [
    CommonModule,
    UiContentWrapperComponent,
    PlaygroundEditorComponent,
    PlaygroundTemplateListComponent,
    PlaygroundFormInfoComponent,
    NgDynamicJsonFormComponent,
    AngularSplitModule,
  ],
  templateUrl: './page-playground.component.html',
  styleUrls: ['./page-playground.component.scss'],
})
export class PagePlaygroundComponent {
  private _layoutService = inject(LayoutService);
  private _langService = inject(LanguageDataService);
  private _templateDataService = inject(PlaygroundTemplateDataService);
  private _docVersionService = inject(DocumentVersionService);

  form = new FormGroup({});
  configs: FormControlConfig[] | string = [];
  showEditor = false;
  currentVersion = this._docVersionService.latestVersion;

  headerHeight$ = this._layoutService.headerHeight$;
  windowSize$ = this._layoutService.windowSize$;
  configs$ = combineLatest([
    this._templateDataService.currentTemplateKey$,
    this._langService.language$,
  ]).pipe(
    debounceTime(0),
    map(([key]) => {
      const examples = this._templateDataService.getExampleTemplate(key);
      const userTemplates = this._templateDataService.getUserTemplate(key);

      return (
        userTemplates || examples || this._templateDataService.fallbackExample
      );
    })
  );

  private _defaultAsSplitSizes = [60, 40];

  onTemplateEdit(value: boolean): void {
    this.showEditor = value;
  }

  onEditorConfirm(e: string | FormControlConfig[]): void {
    this.configs = e;
    this.showEditor = false;
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
  }

  onAsSplitDragEnd(e: IOutputData): void {
    this.asSplitSizes = e.sizes.map((x) => (typeof x === 'string' ? 50 : x));
  }

  resetSplitSizes(): void {
    this.asSplitSizes = this._defaultAsSplitSizes;
  }

  get asSplitSizes(): number[] {
    const data = window.localStorage.getItem('as-split-sizes');
    if (!data) {
      return this._defaultAsSplitSizes;
    }

    try {
      return JSON.parse(data);
    } catch {
      return this._defaultAsSplitSizes;
    }
  }

  set asSplitSizes(value: number[]) {
    window.localStorage.setItem('as-split-sizes', JSON.stringify(value));
  }
}
