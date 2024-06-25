import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
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
import { CONFIGS_INDEX } from 'src/app/example/configs/configs.index';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { PlaygroundEditorComponent } from '../../../playground/components/playground-editor/playground-editor.component';

@Component({
  selector: 'app-doc-form-viewer',
  standalone: true,
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
  templateUrl: './doc-form-viewer.component.html',
  styleUrls: ['./doc-form-viewer.component.scss'],
})
export class DocFormViewerComponent implements OnChanges, AfterViewInit {
  private _cd = inject(ChangeDetectorRef);

  @Input() configs: string | FormControlConfig[] = [];
  @Input() configPath = '';
  @Input() showFormOnly = false;
  @Input() minHeight = '20rem';
  @Input() ui: 'Default' | 'PrimeNg' | 'Angular Material' = 'Default';

  @ViewChild('formContent') formContent?: ElementRef;

  showEditor = false;
  formHeight = '0px';
  configsUntouched: FormControlConfig[] = [];

  uiComponents: { [key: string]: UiComponents | undefined } = {
    Default: undefined,
    PrimeNg: UI_PRIMENG_COMPONENTS,
    'Angular Material': UI_MATERIAL_COMPONENTS,
  };

  private _editorData: any = null;

  ngOnChanges(changes: SimpleChanges): void {
    const { configs, configPath } = changes;

    if (configs) {
      this._parseConfigs();
      this.reset();
    }

    if (configPath) {
      this._loadConfigFromPath();
      this.reset();
    }
  }

  ngAfterViewInit(): void {
    this._getFormHeight();
  }

  onEditorChange(e: any): void {
    this._editorData = e;
  }

  onEdit(): void {
    this.showEditor = true;
  }

  onConfirm(): void {
    if (this._editorData) {
      this.configs = structuredClone(this._editorData);
    }

    this.showEditor = false;
  }

  reset(): void {
    const _configs = structuredClone(this.configsUntouched);

    this.configs = _configs;
    this._editorData = _configs;

    // reset the editor (reassign property to trigger changes)
    this.configsUntouched = [...this.configsUntouched];
  }

  private _loadConfigFromPath(): void {
    if (!this.configPath) return;

    const configFound = this.configPath.split('.').reduce((acc, key) => {
      return (acc as any)[key];
    }, CONFIGS_INDEX);

    const result = Array.isArray(configFound) ? configFound : [configFound];

    this.configsUntouched = [...result];
  }

  private _parseConfigs(): void {
    if (!this.configs) return;

    if (typeof this.configs === 'string') {
      this.configsUntouched = JSON.parse(this.configs);
    }

    if (Array.isArray(this.configs) && this.configs.length > 0) {
      this.configsUntouched = [...this.configs];
    }
  }

  private _getFormHeight(): void {
    if (!this.formContent) return;

    this.formHeight = `${this.formContent.nativeElement.scrollHeight + 1}px`;
    this._cd.detectChanges();
  }
}
