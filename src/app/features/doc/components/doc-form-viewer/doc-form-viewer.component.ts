import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  computed,
  effect,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  FormControlConfig,
  NgDynamicJsonFormComponent,
  provideNgDynamicJsonForm,
} from 'ng-dynamic-json-form';
import { CONFIGS_INDEX } from 'src/app/example/configs/configs.index';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { PlaygroundEditorComponent } from '../../../playground/components/playground-editor/playground-editor.component';

@Component({
  selector: 'app-doc-form-viewer',
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
export class DocFormViewerComponent {
  configs = input<string | FormControlConfig[]>([]);
  configPath = input('');

  showFormOnly = input(false);
  minHeight = input('20rem');

  formContent = viewChild<ElementRef>('formContent');

  configsToUse = signal<FormControlConfig[]>([]);
  showEditor = signal<boolean>(false);
  formHeight = signal<string>('0px');
  editorData = signal<FormControlConfig[] | null>(null);

  configsUntouched = computed<FormControlConfig[]>(() => {
    const configs = this.configs();
    const configPath = this.configPath();

    if (configs.length > 0) {
      if (typeof configs === 'string') {
        return JSON.parse(configs);
      }

      return configs;
    }

    if (configPath) {
      const configFound = configPath.split('.').reduce((acc, key) => {
        return (acc as any)[key];
      }, CONFIGS_INDEX);

      const result = Array.isArray(configFound) ? configFound : [configFound];

      return [...result];
    }
  });

  initData = effect(() => {
    const data = this.configsUntouched();

    if (data) {
      untracked(() => {
        this.configsToUse.set(data);
        this.editorData.set(data);
      });

      this.initData.destroy();
    }
  });

  setFormHeight = effect(() => {
    const el = this.formContent();

    if (!el) {
      return;
    }

    untracked(() => {
      this.formHeight.set(`${el.nativeElement.scrollHeight + 1}px`);
      this.setFormHeight.destroy();
    });
  });

  onEditorChange(e: any): void {
    this.editorData.set(e);
  }

  onEdit(): void {
    this.showEditor.set(true);
  }

  onConfirm(): void {
    const data = this.editorData();

    if (data) {
      this.configsToUse.set(structuredClone(data));
    }

    this.showEditor.set(false);
  }

  reset(): void {
    const data = structuredClone(this.configsUntouched());

    this.configsToUse.set(data);
    this.editorData.set(data);
  }
}
