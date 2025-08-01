import { Injectable, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControlConfig } from 'ng-dynamic-json-form';
import { combineLatest, map } from 'rxjs';
import { LanguageService } from '../../language/language-data.service';
import { PlaygroundTemplateDataService } from './playground-template-data.service';

@Injectable({ providedIn: 'root' })
export class PlaygroundEditorDataService {
  private langService = inject(LanguageService);
  private templateDataService = inject(PlaygroundTemplateDataService);

  private modifiedData:
    | FormControlConfig[]
    | { configs?: FormControlConfig[] }
    | undefined = [];

  configEditorData$ = combineLatest([
    toObservable(this.langService.selectedLanguage),
    this.templateDataService.currentTemplateKey$,
  ]).pipe(
    map(() => {
      const key = this.templateDataService.currentTemplateKey$.value;
      const configs =
        this.templateDataService.getUserTemplate(key) ||
        this.templateDataService.getExampleTemplate(key) ||
        this.templateDataService.fallbackExample;

      return { json: configs as any };
    }),
  );

  get configModifiedData(): typeof this.modifiedData {
    return this.modifiedData;
  }

  set configModifiedData(data: typeof this.modifiedData) {
    this.modifiedData = structuredClone(data);
  }
}
