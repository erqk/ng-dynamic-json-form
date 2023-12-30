import { Injectable, inject } from '@angular/core';
import { FormControlConfig } from 'ng-dynamic-json-form';
import { combineLatest, map } from 'rxjs';
import { Content } from 'vanilla-jsoneditor';
import { LanguageDataService } from '../../language/services/language-data.service';
import { PlaygroundTemplateDataService } from './playground-template-data.service';

@Injectable({ providedIn: 'root' })
export class PlaygroundEditorDataService {
  private _langService = inject(LanguageDataService);
  private _templateDataService = inject(PlaygroundTemplateDataService);

  modifiedData: FormControlConfig[] = [];
  editorData$ = combineLatest([
    this._langService.language$,
    this._templateDataService.currentTemplateKey$,
  ]).pipe(map(() => this.editorData));

  saveModifiedData(data: Content) {
    const _data = (this.getContent(data) as any)['json'];
    if (!_data) return;

    this.modifiedData = _data;
  }

  /**To get the consistent result of jsoneditor */
  getContent(input: Content | undefined): Content {
    let jsonContent = null;

    if (!input) return { json: jsonContent };
    if ('json' in input) jsonContent = input['json'];
    if ('text' in input) {
      try {
        jsonContent = JSON.parse(input['text'] || 'null');
      } catch {}
    }

    return { json: jsonContent };
  }

  get editorData(): Content {
    const key = this._templateDataService.currentTemplateKey$.value;
    const configs =
      this._templateDataService.getUserTemplate(key) ||
      this._templateDataService.getExampleTemplate(key) ||
      this._templateDataService.fallbackExample;

    return { json: configs as any };
  }
}
