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
import { UiContentWrapperComponent } from '../../features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-playground',
  standalone: true,
  imports: [
    CommonModule,
    NgDynamicJsonFormComponent,
    UiContentWrapperComponent,
    AngularSplitModule,
    FormsModule,
    MarkdownModule,
  ],
  templateUrl: './page-playground.component.html',
  styleUrls: ['./page-playground.component.scss'],
})
export class PagePlaygroundComponent {
  headerHeight = 0;
  windowHeight = 0;

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
    size: parseInt(window.localStorage.getItem('form-info-width') || '25'),
    position: 'right',
  };

  language$ = this._languageDataService.language$;
  i18nContent$ = this._languageDataService.i18nContent$;
  onDestroy$ = new Subject();

  constructor(
    private _languageDataService: LanguageDataService,
    private _themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.formUI = window.localStorage.getItem('form-ui') ?? 'ui-basic';
    this._initJsonEditor();
    this._darkThemeEvent();
    this._setUI();
    this._languageChangeEvent();
  }

  ngAfterViewInit(): void {
    this._onWindowResize();
    requestAnimationFrame(() => {
      this.windowHeight = window.innerHeight;
      this.headerHeight =
        document.querySelector('app-header')?.clientHeight || 0;
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
    const content = this._jsonEditorData;
    if (!content) return;

    this.jsonData = '';
    requestAnimationFrame(() => {
      this.jsonData = (content as any)['json'];
      this.editing = false;
    });
  }

  toggleFormEdit(): void {
    this.editing = !this.editing;
  }

  onFormUiChange(): void {
    this._setUI();
    this.generateForm();
  }

  onExampleChange(): void {
    this.loadJsonData(false);
    this.generateForm();
  }

  loadJsonData(reset = true): void {
    if (reset) {
      this._jsonEditorData = this._fallbackJsonData;
    }

    this.jsonEditor?.set(this._jsonEditorData);
  }

  setFormInfoState(tab: 'value' | 'errors'): void {
    this.formInfoState.tab = tab;
  }

  onAsSplitDragEnd(e: { gutterNum: number; sizes: number[] }): void {
    window.localStorage.setItem('form-info-width', e.sizes[1].toString());
  }

  private get _fallbackJsonData() {
    const currentLanguage = this._languageDataService.language$.value;
    const formConfig = (this.exampleList as any)[this.exampleSelected][
      currentLanguage
    ]['config'];

    return { json: formConfig };
  }

  private get _jsonEditorDataKey(): string {
    return `jsonEditorContent-${this.exampleSelected}-${this.language$.value}`;
  }

  private get _jsonEditorData(): Content {
    const jsonData =
      window.localStorage.getItem(this._jsonEditorDataKey) ||
      this._fallbackJsonData;

    try {
      if (typeof jsonData === 'string') {
        return JSON.parse(jsonData);
      }

      if (Array.isArray(jsonData)) {
        return { json: jsonData };
      }

      return jsonData;
    } catch {
      return this._fallbackJsonData;
    }
  }

  private set _jsonEditorData(data: any) {
    window.localStorage.setItem(this._jsonEditorDataKey, JSON.stringify(data));
  }

  private _setUI(): void {
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
  }

  private _initJsonEditor(): void {
    const el = document.querySelector('.json-editor') as HTMLElement;
    const content = this._jsonEditorData;

    this.jsonEditor = new JSONEditor({
      target: el,
      props: {
        mode: Mode.text,
        content,
        onChange: (content, previousContent, status) => {
          this._jsonEditorData = this._getContent(content);
        },
      },
    });
  }

  /**To get the consistent result of jsoneditor */
  private _getContent(input: Content | undefined): Content {
    let jsonContent = null;

    if (!input) return { json: jsonContent };
    if ('json' in input) jsonContent = input['json'];
    if ('text' in input) jsonContent = JSON.parse(input['text'] || 'null');

    return { json: jsonContent };
  }

  private _languageChangeEvent(): void {
    this._languageDataService.language$
      .pipe(
        tap(() => {
          this.loadJsonData(false);
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
        if (window.innerWidth <= breakpoints.medium) {
          this.formInfoState.position = 'bottom';
        } else {
          this.formInfoState.position = 'right';
        }

        this.windowHeight = window.innerHeight;
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
