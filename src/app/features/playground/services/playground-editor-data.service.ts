import { Injectable, inject } from '@angular/core';
import { FormControlConfig } from 'ng-dynamic-json-form';
import { combineLatest, map } from 'rxjs';
import { Content } from 'vanilla-jsoneditor';
import { LanguageDataService } from '../../language/services/language-data.service';
import { getJsonEditorContent } from '../utilities/get-json-editor-content';
import { PlaygroundTemplateDataService } from './playground-template-data.service';

@Injectable({ providedIn: 'root' })
export class PlaygroundEditorDataService {
  private _langService = inject(LanguageDataService);
  private _templateDataService = inject(PlaygroundTemplateDataService);

  configModifiedData: FormControlConfig[] = [];
  configEditorData$ = combineLatest([
    this._langService.language$,
    this._templateDataService.currentTemplateKey$,
  ]).pipe(map(() => this._configEditorData));

  saveModifiedData(data: Content) {
    const _data = (this.getContent(data) as any)['json'];
    if (!_data) return;

    this.configModifiedData = _data;
  }

  /**To get the consistent result of jsoneditor */
  getContent(input: Content | undefined): Content {
    return getJsonEditorContent(input);
  }

  private get _configEditorData(): Content {
    const key = this._templateDataService.currentTemplateKey$.value;
    const configs =
      this._templateDataService.getUserTemplate(key) ||
      this._templateDataService.getExampleTemplate(key) ||
      this._templateDataService.fallbackExample;

    return { json: configs as any };
  }
}
