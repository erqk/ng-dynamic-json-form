import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FormValidationService,
  NgDynamicJsonFormComponent,
} from 'ng-dynamic-json-form';
import { CustomErrorMessageComponent } from 'src/app/example/components/custom-error-message/custom-error-message.component';
import { FORM_CONFIG_BASIC_EN } from 'src/app/example/configs/basic/form-config-basic_en.constant';
import { FORM_CONFIG_BASIC_ZHTW } from 'src/app/example/configs/basic/form-config-basic_zh-TW.constant';
import { LanguageDataService } from 'src/app/features/language/language-data.service';

@Component({
  selector: 'app-docs-custom-error-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-3">
      <ng-dynamic-json-form
        [configs]="[$any(configs)[language$.value]]"
        [globalLayoutComponents]="{
          errorMessage: customError ? errorComponent : undefined
        }"
        [formControl]="control"
        (formGet)="patchValue()"
      ></ng-dynamic-json-form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, NgDynamicJsonFormComponent],
  providers: [FormValidationService],
  standalone: true,
})
export class DocsCustomErrorMessageComponent {
  private _langService = inject(LanguageDataService);

  @Input() customError = false;

  configs = {
    en: FORM_CONFIG_BASIC_EN.find((x) => x.formControlName === 'name'),
    'zh-TW': FORM_CONFIG_BASIC_ZHTW.find((x) => x.formControlName === 'name'),
  };

  errorComponent = CustomErrorMessageComponent;
  control = new FormControl({}, [Validators.required]);
  language$ = this._langService.language$;

  patchValue(): void {
    this.control.patchValue({ name: '0' });
  }
}
