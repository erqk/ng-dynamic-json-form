import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import {
  FormControlConfig,
  NgDynamicJsonFormComponent,
} from 'ng-dynamic-json-form';
import { UI_MATERIAL_COMPONENTS } from 'ng-dynamic-json-form/ui-material';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { MarkdownModule } from 'ngx-markdown';
import {
  Subject,
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { PLAYGROUND_CONFIGS } from 'src/app/example/playground-configs/playground-configs.constant';
import { Content, JSONEditor, Mode } from 'vanilla-jsoneditor';
import { CustomInputGroupComponent } from '../../example/components/custom-input-group/custom-input-group.component';
import { CustomInputComponent } from '../../example/components/custom-input/custom-input.component';
import { firstUppercaseValidator } from '../../example/validators/first-uppercase.validator';
import { LanguageDataService } from '../../features/language/services/language-data.service';
import { ThemeService } from '../../features/theme/services/theme.service';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-page-playground',
  standalone: true,
  imports: [
    CommonModule,
    NgDynamicJsonFormComponent,
    ContentWrapperComponent,
    AngularSplitModule,
    FormsModule,
    MarkdownModule,
  ],
  templateUrl: './page-playground.component.html',
  styleUrls: ['./page-playground.component.scss'],
})
export class PagePlaygroundComponent {
  headerHeight = 0;

  jsonEditor: JSONEditor | null = null;
  jsonData: FormControlConfig[] | string = [];

  formUI = 'ui-basic';
  form?: UntypedFormGroup;

  editing = false;

  customValidators = {
    firstUppercase: firstUppercaseValidator,
  };
  customComponents = {
    'custom-input': CustomInputComponent,
    'custom-input-group': CustomInputGroupComponent,
  };
  customUIComponents: any = UI_PRIMENG_COMPONENTS;

  exampleList = PLAYGROUND_CONFIGS;
  exampleSelected = 'all';

  formInfoState = {
    tab: 'value',
    size: 25,
    position: 'right',
  };

  language$ = this._languageDataService.language$;
  languageData$ = this._languageDataService.languageData$;
  onDestroy$ = new Subject();

  constructor(
    private _languageDataService: LanguageDataService,
    private _themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.formUI = window.localStorage.getItem('form-ui') ?? 'ui-basic';
    this._initJsonEditor();
    this._darkThemeEvent();
    this._languageChangeEvent();
    this.generateForm();
  }

  ngAfterViewInit(): void {
    this._onWindowResize();
    requestAnimationFrame(() => {
      this.headerHeight = document.querySelector('.header')?.clientHeight || 0;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
  }

  generateForm(): void {
    const content = this._savedJson;
    if (!content) return;

    this.jsonData = '';
    requestAnimationFrame(() => {
      this.jsonData = (content as any).json;
      this.editing = false;
    });
  }

  toggleFormEdit(): void {
    this.editing = !this.editing;
  }

  setUI(): void {
    switch (this.formUI) {
      case 'ui-primeng':
        this.customUIComponents = UI_PRIMENG_COMPONENTS;
        break;

      case 'ui-material':
        this.customUIComponents = UI_MATERIAL_COMPONENTS;
        break;

      default:
        this.customUIComponents = null;
        break;
    }

    window.localStorage.setItem('form-ui', this.formUI);
    this.generateForm();
  }

  onExampleChange(): void {
    this.loadJsonData(false);
    this.generateForm();
  }

  loadJsonData(reset = true): void {
    let content: any = null;

    if (reset) {
      content = this._fallbackJsonData;
      this._saveEditorContent(this._fallbackJsonData);
    } else {
      content = this._savedJson;
    }

    this.jsonEditor?.set(content);
  }

  setFormInfoState(tab: 'value' | 'errors'): void {
    this.formInfoState.tab = tab;
  }

  private get _fallbackJsonData() {
    const currentLanguage = this._languageDataService.language$.value;
    const formConfig = (this.exampleList as any)[this.exampleSelected][
      currentLanguage
    ]['config'];

    return { json: formConfig };
  }

  private get _savedJson(): Content {
    const jsonData =
      window.sessionStorage.getItem(
        `jsonEditorContent-${this.exampleSelected}-${this.language$.value}`
      ) || this._fallbackJsonData;

    let content = null;
    try {
      const data =
        typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      content = Array.isArray(data) ? { json: data } : data;
    } catch (e) {}

    return content;
  }

  private _saveEditorContent(input: any): void {
    window.sessionStorage.setItem(
      `jsonEditorContent-${this.exampleSelected}-${this.language$.value}`,
      JSON.stringify(input)
    );
  }

  private _initJsonEditor(): void {
    const el = document.querySelector('.json-editor') as HTMLElement;
    const content = this._savedJson;
    const playgroundThis = this;

    this.jsonEditor = new JSONEditor({
      target: el,
      props: {
        mode: Mode.text,
        content,
        onChange(content, previousContent, status) {
          const contentParsed = playgroundThis._getContent(content);
          playgroundThis._saveEditorContent(contentParsed);
        },
      },
    });

    this._saveEditorContent(content);
  }

  /**To get the consistent result of jsoneditor */
  private _getContent(input: Content | undefined): Content {
    let jsonContent = null;

    if (!input) {
      return { json: jsonContent };
    }

    if ('json' in input && input.json) {
      jsonContent = input.json;
    }

    if ('text' in input && input.text) {
      try {
        jsonContent = JSON.parse(input.text);
      } catch (e) {}
    }

    return { json: jsonContent };
  }

  private _languageChangeEvent(): void {
    this._languageDataService.language$
      .pipe(
        tap(() => {
          this.loadJsonData();
          this.generateForm();
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  private _darkThemeEvent(): void {
    const setDarkTheme = (dark = false) => {
      const el = document.querySelector('.json-editor') as HTMLElement;

      if (dark) el.classList.add('jse-theme-dark');
      else el.classList.remove('jse-theme-dark');
      this.jsonEditor?.refresh();
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark$ = of(mediaQueryList).pipe(map((x) => x.matches));

    combineLatest([prefersDark$, this._themeService.theme$])
      .pipe(
        debounceTime(0),
        tap(([prefersDark, currentTheme]) => {
          const useDark =
            currentTheme === 'dark' || (currentTheme === 'auto' && prefersDark);
          setDarkTheme(useDark);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  private _onWindowResize(): void {
    const breakpoints = {
      large: 1400,
      medium: 768,
    };

    const action = () =>
      requestAnimationFrame(() => {
        if (window.innerWidth <= breakpoints.large) {
          this.formInfoState.size = 50;
          this.formInfoState.position = 'right';
        } else {
          this.formInfoState.size = 30;
          this.formInfoState.position = 'right';
        }

        if (window.innerWidth <= breakpoints.medium) {
          this.formInfoState.size = 35;
          this.formInfoState.position = 'bottom';
        }
      });

    action();
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        tap(() => action()),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }
}
