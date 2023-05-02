import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import {
  FormControlConfig,
  NgDynamicJsonFormModule,
} from 'ng-dynamic-json-form';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { Content, JSONEditor, Mode } from 'vanilla-jsoneditor';
import { CustomInputComponent } from '../../example/components/custom-input/custom-input.component';
import { testData } from '../../example/constants/test-data';
import { firstUppercaseValidator } from '../../example/validators/first-uppercase.validator';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { LanguageDataService } from '../../features/language/services/language-data.service';
import { CustomInputGroupComponent } from '../../example/components/custom-input-group/custom-input-group.component';
@Component({
  selector: 'app-page-playground',
  standalone: true,
  imports: [
    CommonModule,
    NgDynamicJsonFormModule,
    ContentWrapperComponent,
    AngularSplitModule,
  ],
  templateUrl: './page-playground.component.html',
  styleUrls: ['./page-playground.component.scss'],
})
export class PagePlaygroundComponent {
  headerHeight = 0;

  jsonEditor: JSONEditor | null = null;
  jsonData: FormControlConfig[] = [];

  formUI = 'ui-basic';

  form?: UntypedFormGroup;

  customValidators = {
    firstUppercase: firstUppercaseValidator,
  };

  customComponents = {
    'custom-input': CustomInputComponent,
    'custom-input-group': CustomInputGroupComponent,
  };

  customUIComponentList: any = UI_PRIMENG_COMPONENTS;

  languageData$ = this.languageDataService.languageData$;
  
  constructor(private languageDataService: LanguageDataService) {}

  ngOnInit(): void {
    this.formUI = window.localStorage.getItem('form-ui') ?? 'ui-basic';
    this.initJsonEditor();
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.headerHeight = document.querySelector('.header')?.clientHeight || 0;
    });
  }

  private initJsonEditor(): void {
    const el = document.querySelector('.json-editor') as HTMLElement;
    const content =
      window.sessionStorage.getItem('jsonEditorContent') ||
      JSON.stringify(testData);

    let json = null;

    try {
      json = JSON.parse(content);
      window.sessionStorage.setItem('jsonEditorContent', content);
    } catch (e) {}

    const playgroundThis = this;
    this.jsonEditor = new JSONEditor({
      target: el,
      props: {
        mode: Mode.text,
        content: {
          json,
        },
        onChange(content, previousContent, status) {
          const jsonString = playgroundThis.getContent(content);
          window.sessionStorage.setItem('jsonEditorContent', jsonString);
        },
      },
    });
  }

  private getContent(input: Content | undefined): string {
    if (!input) {
      return '';
    }

    if ('json' in input) {
      return !input.json ? '' : JSON.stringify(input.json);
    }

    if ('text' in input) {
      return input.text ?? '';
    }

    return '';
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
  }

  // Update form manually to prevent form binding errors when JSON is invalid
  generateForm(): void {
    const content = this.getContent(this.jsonEditor?.get());
    if (!content) return;

    try {
      this.jsonData = JSON.parse(content);
    } catch (e) {}
  }

  setUI(e: Event): void {
    if (!this.jsonData.length) return;

    const select = e.target as HTMLSelectElement;
    switch (select.value) {
      case 'ui-basic':
        this.customUIComponentList = null;
        break;

      case 'ui-primeng':
        this.customUIComponentList = UI_PRIMENG_COMPONENTS;
        break;
    }

    this.formUI = select.value;
    window.localStorage.setItem('form-ui', this.formUI);
    this.generateForm();
  }
}
