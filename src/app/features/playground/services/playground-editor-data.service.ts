import { Injectable, inject } from '@angular/core';
import { FormControlConfig } from 'ng-dynamic-json-form';
import { combineLatest, map } from 'rxjs';
import { LanguageService } from '../../language/language-data.service';
import { PlaygroundTemplateDataService } from './playground-template-data.service';

@Injectable({ providedIn: 'root' })
export class PlaygroundEditorDataService {
  private _langService = inject(LanguageService);
  private _templateDataService = inject(PlaygroundTemplateDataService);

  private _modifiedData:
    | FormControlConfig[]
    | { configs?: FormControlConfig[] }
    | undefined = [];

  configEditorData$ = combineLatest([
    this._langService.language$,
    this._templateDataService.currentTemplateKey$,
  ]).pipe(
    map(() => {
      const key = this._templateDataService.currentTemplateKey$.value;
      const configs =
        this._templateDataService.getUserTemplate(key) ||
        this._templateDataService.getExampleTemplate(key) ||
        this._templateDataService.fallbackExample;

      return { json: configs as any };
    })
  );

  get configModifiedData(): typeof this._modifiedData {
    return this._modifiedData;
  }

  set configModifiedData(data: typeof this._modifiedData) {
    this._modifiedData = structuredClone(data);
  }
}
