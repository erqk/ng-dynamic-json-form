import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
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
  selector: 'doc-form-viewer',
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
  templateUrl: './doc-form-viewer.component.html',
  styleUrls: ['./doc-form-viewer.component.scss'],
})
export class DocFormViewerComponent implements OnInit, AfterViewInit {
  @Input() configs: string | FormControlConfig[] = [];
  @Input() configPath = '';
  @Input() showFormOnly = false;
  @Input() minHeight = '20rem';
  @Input() ui: 'Default' | 'PrimeNg' | 'Angular Material' = 'Default';

  @ViewChild('formContent') formContent?: ElementRef;

  showEditor = false;
  formHeight = '0px';
  configsLoaded: FormControlConfig[] = [];

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
    this.configs = structuredClone(this.configsLoaded);
    this._editorData = structuredClone(this.configsLoaded);
    this.configsLoaded = [...this.configsLoaded];
  }

  private _loadConfig(): void {
    if (!this.configPath && !this.configs) return;

    if (this.configPath) {
      const configFound = this.configPath.split('.').reduce((acc, key) => {
        return (acc as any)[key];
      }, CONFIGS_INDEX);
      const result = Array.isArray(configFound) ? configFound : [configFound];

      this.configsLoaded = result as FormControlConfig[];
    }

    if (this.configs && typeof this.configs === 'string') {
      this.configsLoaded = JSON.parse(this.configs);
    }

    this.reset();
  }

  private _getFormHeight(): void {
    if (!this.formContent) return;
    this.formHeight = `${this.formContent.nativeElement.scrollHeight + 1}px`;
  }
}
