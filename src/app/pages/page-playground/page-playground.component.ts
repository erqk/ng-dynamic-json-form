import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { AngularSplitModule, IOutputData } from 'angular-split';
import {
  NgDynamicJsonFormComponent,
  UiComponents,
  provideNgDynamicJsonForm
} from 'ng-dynamic-json-form';
import { UI_MATERIAL_COMPONENTS } from 'ng-dynamic-json-form/ui-material';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { Observable, combineLatest, debounceTime, map } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { CustomErrorMessageComponent } from 'src/app/example/components/custom-error-message/custom-error-message.component';
import { CustomInputGroupComponent } from 'src/app/example/components/custom-input-group/custom-input-group.component';
import { CustomInputComponent } from 'src/app/example/components/custom-input/custom-input.component';
import { CustomLoadingComponent } from 'src/app/example/components/custom-loading/custom-loading.component';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { HeaderTabBarComponent } from 'src/app/features/header/components/header-tab-bar/header-tab-bar.component';
import { LanguageDataService } from 'src/app/features/language/language-data.service';
import { PlaygroundEditorComponent } from 'src/app/features/playground/components/playground-editor/playground-editor.component';
import { PlaygroundFormInfoComponent } from 'src/app/features/playground/components/playground-form-info/playground-form-info.component';
import { PlaygroundTemplateListComponent } from 'src/app/features/playground/components/playground-template-list/playground-template-list.component';
import { PlaygroundEditorDataService } from 'src/app/features/playground/services/playground-editor-data.service';
import { PlaygroundSettingsService } from 'src/app/features/playground/services/playground-settings.service';
import { PlaygroundTemplateDataService } from 'src/app/features/playground/services/playground-template-data.service';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';
import { VersionService } from 'src/app/features/version/version.service';
import { Content } from 'vanilla-jsoneditor';

@Component({
  selector: 'app-page-playground',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiContentWrapperComponent,
    HeaderTabBarComponent,
    PlaygroundEditorComponent,
    PlaygroundTemplateListComponent,
    PlaygroundFormInfoComponent,
    NgDynamicJsonFormComponent,
    AngularSplitModule,
  ],
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
      },
      globalLayoutComponents: {
        loading: CustomLoadingComponent,
        errorMessage: CustomErrorMessageComponent,
        // formTitle: CustomFormTitleComponent
      },
    }),
  ],
  templateUrl: './page-playground.component.html',
  styleUrls: ['./page-playground.component.scss'],
})
export class PagePlaygroundComponent {
  private _layoutService = inject(LayoutService);
  private _langService = inject(LanguageDataService);
  private _templateDataService = inject(PlaygroundTemplateDataService);
  private _versionService = inject(VersionService);
  private _playgroundSettingsService = inject(PlaygroundSettingsService);
  private _editorDataService = inject(PlaygroundEditorDataService);

  form = new FormGroup({});
  formControl = new UntypedFormControl('');

  showEditor = false;
  currentVersion = this._versionService.currentVersion;
  mobileTabSelected = 0;
  asSplitSizes = this._playgroundSettingsService.asSplitSizes;

  customUiComponents: { [key: string]: UiComponents | undefined } = {
    '--': undefined,
    PrimeNg: UI_PRIMENG_COMPONENTS,
    'Angular Material': UI_MATERIAL_COMPONENTS,
  };

  customComponents = {
    customComponentControl: CustomInputComponent,
    customComponentGroup: CustomInputGroupComponent,
  };

  currentUi =
    this._playgroundSettingsService.formUi ||
    Object.keys(this.customUiComponents)[0];

  hideErrorMessageControl = new FormControl<boolean | undefined>(undefined);

  headerHeight$ = this._layoutService.headerHeight$;
  windowSize$ = this._layoutService.windowSize$;

  mobileTabs$: Observable<string[]> = this._langService.i18nContent$.pipe(
    map((x) => x['PLAYGROUND']['TABS']),
    map((x) => Object.values(x))
  );

  editorData$ = this._editorDataService.configEditorData$;

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

  onTemplateEdit(value: boolean): void {
    this.showEditor = value;
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
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

  onConfigEditing(e: Content): void {
    this._editorDataService.saveModifiedData(e);
  }
}
