import { Injectable, inject } from '@angular/core';
import { FormControlConfig } from 'ng-dynamic-json-form';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  debounceTime,
  map,
  startWith,
} from 'rxjs';
import { LanguageType } from '../../language/language.type';
import { LanguageDataService } from '../../language/language-data.service';
import { PLAYGROUND_CONFIGS } from '../constants/playground-configs.constant';
import { PlaygroundConfigItem } from '../interfaces/playground-config-item.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundTemplateDataService {
  private _langService = inject(LanguageDataService);
  private _templateList = PLAYGROUND_CONFIGS;

  browserStorageUpdated$ = new Subject<void>();

  currentTemplateKey$ = new BehaviorSubject<string>(
    Object.keys(this._templateList)[0]
  );

  exampleList$ = combineLatest([
    this._langService.language$,
    this.browserStorageUpdated$.pipe(startWith(null)),
  ]).pipe(
    debounceTime(0),
    map(([lang]) =>
      Object.keys(this._templateList).map((key) => {
        const value = (this._templateList[key] as any)[
          lang
        ] as PlaygroundConfigItem;
        const config = this.getExampleTemplate(key) ?? value.config;

        return {
          ...value,
          config,
          key,
        };
      })
    )
  );

  userTemplateList$ = this.browserStorageUpdated$.pipe(
    startWith(null),
    map(() => {
      if (!this._userTemplateSaved) {
        return [];
      }

      return Object.keys(this._userTemplateSaved)
        .sort()
        .reduce((acc, key) => {
          acc.push({ key, label: key, config: this._userTemplateSaved![key] });
          return acc;
        }, [] as PlaygroundConfigItem[]);
    })
  );

  getExampleTemplate(key: string): FormControlConfig[] | null {
    const lang = this._langService.language$.value;
    const savedData = this._exampleSaved;

    if (!savedData) {
      return null;
    }

    return savedData[key]?.[lang] || null;
  }

  setExampleTemplate(
    key: string,
    data: FormControlConfig[] | { configs?: FormControlConfig[] }
  ) {
    if (typeof window === 'undefined') return;

    const noData =
      !data || (Array.isArray(data) ? !data.length : !data.configs?.length);
    if (noData) return;

    const lang = this._langService.language$.value;
    const savedData = this._exampleSaved;
    const newData = !savedData
      ? { [key]: { [lang]: data } }
      : {
          ...savedData,
          [key]: {
            ...savedData[key],
            [lang]: data,
          },
        };

    window.sessionStorage.setItem(
      this._exampleSavedTemplateKey,
      JSON.stringify(newData)
    );

    this.browserStorageUpdated$.next();
  }

  getUserTemplate(key: string): FormControlConfig[] | null {
    const savedData = this._userTemplateSaved;
    if (!savedData) return null;

    return savedData[key] || null;
  }

  setUserTemplate(
    key: string,
    data: FormControlConfig[] | { configs?: FormControlConfig[] } | null
  ) {
    if (typeof window === 'undefined') return;

    const savedData = this._userTemplateSaved;
    const clearData = savedData && data === null;
    const newData = !savedData
      ? { [key]: data }
      : {
          ...savedData,
          [key]: data,
        };

    if (clearData) {
      delete newData[key];
    }

    window.localStorage.setItem(
      this._userSavedTemplateKey,
      JSON.stringify(newData)
    );

    this.browserStorageUpdated$.next();
  }

  get allTemplateKeys(): string[] {
    return Object.keys(this._templateList)
      .sort()
      .concat(
        !this._userTemplateSaved
          ? []
          : Object.keys(this._userTemplateSaved).sort()
      );
  }

  get fallbackExample(): FormControlConfig[] {
    const lang = this._langService.language$.value;
    const key = this._currentTemplateKey;
    const formConfig = (this._templateList as any)[key]?.[lang]?.['config'];

    return !formConfig ? [] : formConfig;
  }

  private get _currentTemplateKey(): string {
    return this.currentTemplateKey$.value || Object.keys(this._templateList)[0];
  }

  private get _exampleSavedTemplateKey(): string {
    return `playground-editor-data`;
  }

  private get _userSavedTemplateKey(): string {
    return `playground-editor-user-data`;
  }

  private get _exampleSaved(): {
    [key: string]: {
      [k in LanguageType]: FormControlConfig[];
    };
  } | null {
    if (typeof window === 'undefined') return null;

    const savedData = window.sessionStorage.getItem(
      this._exampleSavedTemplateKey
    );

    if (!savedData) {
      return null;
    }

    try {
      return JSON.parse(savedData);
    } catch {
      return null;
    }
  }

  private get _userTemplateSaved(): {
    [key: string]: FormControlConfig[];
  } | null {
    if (typeof window === 'undefined') return null;
    
    const savedData = window.localStorage.getItem(this._userSavedTemplateKey);

    if (!savedData) {
      return null;
    }

    try {
      return JSON.parse(savedData);
    } catch {
      return null;
    }
  }
}
