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
import {
  ConfigItem,
  PLAYGROUND_CONFIGS,
} from 'src/app/example/playground-configs/playground-configs.constant';
import { LanguageType } from '../../language/language.type';
import { LanguageDataService } from '../../language/services/language-data.service';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundTemplateDataService {
  private _langService = inject(LanguageDataService);
  private _templateList = PLAYGROUND_CONFIGS;

  localStorageUpdated$ = new Subject<void>();

  currentTemplateKey$ = new BehaviorSubject<string>(
    Object.keys(this._templateList)[0]
  );

  exampleList$ = combineLatest([
    this._langService.language$,
    this.localStorageUpdated$.pipe(startWith(null)),
  ]).pipe(
    debounceTime(0),
    map(([lang]) =>
      Object.keys(this._templateList).reduce((acc, key) => {
        acc.push({
          ...(this._templateList as any)[key][lang],
          key,
        });
        return acc;
      }, [] as ConfigItem[])
    )
  );

  userTemplateList$ = this.localStorageUpdated$.pipe(
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
        }, [] as ConfigItem[]);
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

  setExampleTemplate(key: string, data: FormControlConfig[]) {
    if (!data.length) return;

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

    window.localStorage.setItem(
      this._exampleSavedTemplateKey,
      JSON.stringify(newData)
    );

    this.localStorageUpdated$.next();
  }

  getUserTemplate(key: string): FormControlConfig[] | null {
    const savedData = this._userTemplateSaved;
    if (!savedData) return null;

    return savedData[key] || null;
  }

  setUserTemplate(key: string, data: FormControlConfig[] | null) {
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

    this.localStorageUpdated$.next();
  }

  get allTemplateKeys(): string[] {
    return Object.keys(this._templateList).concat(
      !this._userTemplateSaved ? [] : Object.keys(this._userTemplateSaved)
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
    const savedData = window.localStorage.getItem(
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
