import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AngularSplitModule, IOutputData } from 'angular-split';
import { FormControlConfig } from 'ng-dynamic-json-form';
import { UI_MATERIAL_COMPONENTS } from 'ng-dynamic-json-form/ui-material';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import {
  combineLatest,
  concatAll,
  debounceTime,
  map,
  Observable,
  share,
  tap,
  toArray,
} from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { CustomInputComponent } from 'src/app/example/components/custom-input/custom-input.component';
import { LanguageService } from 'src/app/features/language/language-data.service';
import { PlaygroundEditorComponent } from 'src/app/features/playground/components/playground-editor/playground-editor.component';
import { PlaygroundFormDebuggerComponent } from 'src/app/features/playground/components/playground-form-debugger/playground-form-debugger.component';
import { PlaygroundFormMaterialComponent } from 'src/app/features/playground/components/playground-form/playground-form-material.component';
import { PlaygroundFormPrimengComponent } from 'src/app/features/playground/components/playground-form/playground-form-primeng.component';
import { PlaygroundFormComponent } from 'src/app/features/playground/components/playground-form/playground-form.component';
import { PlaygroundTemplateListComponent } from 'src/app/features/playground/components/playground-template-list/playground-template-list.component';
import { PlaygroundEditorDataService } from 'src/app/features/playground/services/playground-editor-data.service';
import { PlaygroundSettingsService } from 'src/app/features/playground/services/playground-settings.service';
import { PlaygroundTemplateDataService } from 'src/app/features/playground/services/playground-template-data.service';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';
import { VersionService } from 'src/app/features/version/version.service';

@Component({
  selector: 'app-page-playground',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiContentWrapperComponent,
    PlaygroundEditorComponent,
    PlaygroundTemplateListComponent,
    AngularSplitModule,
    PlaygroundFormComponent,
    PlaygroundFormDebuggerComponent,
    PlaygroundFormPrimengComponent,
    PlaygroundFormMaterialComponent,
  ],
  templateUrl: './page-playground.component.html',
  styleUrls: ['./page-playground.component.scss'],
})
export class PagePlaygroundComponent implements OnInit {
  private _http = inject(HttpClient);
  private _title = inject(Title);
  private _layoutService = inject(LayoutService);
  private _langService = inject(LanguageService);
  private _templateDataService = inject(PlaygroundTemplateDataService);
  private _versionService = inject(VersionService);
  private _playgroundSettingsService = inject(PlaygroundSettingsService);
  private _editorDataService = inject(PlaygroundEditorDataService);

  @ViewChild(PlaygroundFormComponent)
  playgroundFormRef?: PlaygroundFormComponent;

  MOBILE_BREAKPOINT = 992;

  uiComponents = [
    {
      key: 'UI Basic',
      value: undefined,
    },
    {
      key: 'Prime NG',
      value: UI_PRIMENG_COMPONENTS,
    },
    {
      key: 'Angular Material',
      value: UI_MATERIAL_COMPONENTS,
    },
  ];

  form = new FormGroup({});
  formControl = new UntypedFormControl('');

  showEditor = false;
  currentVersion = this._versionService.docVersion;
  mobileTabSelected = 0;
  asSplitSizes = this._playgroundSettingsService.asSplitSizes;

  customUiComponents = this.uiComponents.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as any);

  customComponents = {
    customInput: CustomInputComponent,
  };

  currentUi =
    this._playgroundSettingsService.formUi ||
    Object.keys(this.customUiComponents)[0];

  optionsSources = {
    custom$: this._http.get('https://dummyjson.com/products').pipe(
      map((x) => (x as any).products),
      concatAll(),
      map((x: any) => ({ label: x.title, value: x })),
      toArray()
    ),
  };

  windowSize$ = this._layoutService.windowSize$;

  mobileTabs$: Observable<string[]> = this._langService.i18nContent$.pipe(
    map((x) => x['PLAYGROUND']['TABS']),
    map((x) => Object.values(x))
  );

  editorData$ = this._editorDataService.configEditorData$.pipe(share());

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
    }),
    tap(() => {
      this.form.reset();
      this.formControl.reset();
    })
  );

  ngOnInit(): void {
    this._langService.i18nContent$
      .pipe(tap((x) => this._title.setTitle(x['MENU']['PLAYGROUND'])))
      .subscribe();
  }

  onTemplateEdit(value: boolean): void {
    this.showEditor = value;
  }

  onFormUiChange(e: string): void {
    this.currentUi = this._playgroundSettingsService.formUi = e;
  }

  onAsSplitDragEnd(e: IOutputData): void {
    this.asSplitSizes = this._playgroundSettingsService.asSplitSizes =
      e.sizes.map((x) => (typeof x === 'string' ? 50 : x));
  }

  resetSplitSizes(): void {
    this.asSplitSizes = this._playgroundSettingsService.asSplitSizes =
      this._playgroundSettingsService.defaultAsSplitSizes;
  }

  switchMobileTab(i: number): void {
    this.mobileTabSelected = i;
  }

  onConfigEditing(e: FormControlConfig[]): void {
    this._editorDataService.configModifiedData = e;
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
  }
}
