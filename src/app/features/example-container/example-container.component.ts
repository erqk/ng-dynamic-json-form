import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormControlConfig,
  NgDynamicJsonFormComponent,
  UiComponents,
  provideNgDynamicJsonForm,
} from 'ng-dynamic-json-form';
import { UI_MATERIAL_COMPONENTS } from 'ng-dynamic-json-form/ui-material';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { DOCS_CONFIGS_INDEX_EN } from 'src/app/docs-example/configs/index_en';
import { DOCS_CONFIGS_INDEX_ZHTW } from 'src/app/docs-example/configs/index_zh-TW';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { LanguageDataService } from '../language/services/language-data.service';
import { PlaygroundEditorComponent } from '../playground/components/playground-editor/playground-editor.component';

@Component({
  selector: 'app-example-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PlaygroundEditorComponent,
    NgDynamicJsonFormComponent,
  ],
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
      },
    }),
  ],
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss'],
})
export class ExampleContainerComponent implements OnInit, AfterViewInit {
  private _cd = inject(ChangeDetectorRef);
  private _langService = inject(LanguageDataService);

  @Input() configs: FormControlConfig[] = [];
  @Input() configPath = '';
  @Input() minHeight = '20rem';
  @Input() ui: 'Default' | 'PrimeNg' | 'Angular Material' = 'Default';

  @ViewChild('formContent') formContent?: ElementRef;

  showEditor = false;
  formHeight = '0px';

  uiComponents: { [key: string]: UiComponents | undefined } = {
    Default: undefined,
    PrimeNg: UI_PRIMENG_COMPONENTS,
    'Angular Material': UI_MATERIAL_COMPONENTS,
  };

  private _editorData: any = null;

  ngOnInit(): void {
    this._loadConfig();
  }

  ngAfterViewInit(): void {
    this._getFormHeight();
    this._cd.markForCheck();
    this._cd.detectChanges();
  }

  onEditorChange(e: any): void {
    this._editorData = e;
  }

  onEdit(): void {
    this.showEditor = true;
  }

  onConfirm(): void {
    if (this._editorData) {
      this.configs = this._editorData;
    }

    this.showEditor = false;
  }

  reset(): void {
    this.configs = [];

    requestAnimationFrame(() => {
      this._loadConfig();
      this._editorData = this.configs;
    });
  }

  private _loadConfig(): void {
    if (!this.configPath) return;

    const _configs =
      this._langService.currentLanguage === 'en'
        ? DOCS_CONFIGS_INDEX_EN
        : DOCS_CONFIGS_INDEX_ZHTW;

    this.configs = this.configPath.split('.').reduce((acc, key) => {
      return acc[key];
    }, _configs as any);
  }

  private _getFormHeight(): void {
    if (!this.formContent) return;
    this.formHeight = `${this.formContent.nativeElement.scrollHeight + 1}px`;
  }
}
