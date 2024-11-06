import { CommonModule } from '@angular/common';
import { Component, Input, isDevMode } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import {
  CustomComponents,
  FormControlConfig,
  NgDynamicJsonFormComponent,
  provideNgDynamicJsonForm,
} from 'ng-dynamic-json-form';
import { FormStatusFunctions } from 'ng-dynamic-json-form/core/models/form-status-functions.interface';
import { CustomErrorMessageComponent } from 'src/app/example/components/custom-error-message/custom-error-message.component';
import { CustomLoadingComponent } from 'src/app/example/components/custom-loading/custom-loading.component';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { textareaMaxLength } from 'src/app/example/validators/textarea-max-length.validator';

@Component({
  selector: 'app-playground-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgDynamicJsonFormComponent],
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
        textareaMaxLength,
      },
      // labelComponent: CustomFormTitleComponent,
      loadingComponent: CustomLoadingComponent,
      errorComponent: CustomErrorMessageComponent,
    }),
  ],
  templateUrl: './playground-form.component.html',
  styleUrls: ['./playground-form.component.scss'],
})
export class PlaygroundFormComponent {
  @Input() configs: FormControlConfig[] = [];
  @Input() customComponents?: CustomComponents;
  @Input() hideErrorMessage?: boolean;
  @Input() control = new FormControl();
  @Input() optionsSources?: NgDynamicJsonFormComponent['optionsSources'];

  isDev = isDevMode();
  form?: UntypedFormGroup;
  statusFunctions?: FormStatusFunctions;

  toolbarContent = [
    {
      label: 'Mark form:',
      children: [
        {
          label: 'dirty',
          action: () => this.statusFunctions?.setDirty(),
        },
        {
          label: 'pristine',
          action: () => this.statusFunctions?.setPristine(),
        },
        {
          label: 'touched',
          action: () => this.statusFunctions?.setTouched(),
        },
        {
          label: 'untouched',
          action: () => this.statusFunctions?.setUntouched(),
        },
      ],
    },
  ];

  onOptionsLoaded(): void {
    if (typeof window !== 'undefined') {
      console.log('Options loaded');
    }
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
    // if (typeof window !== 'undefined') {
    //   console.log('form get', e);
    // }
  }

  onDisplayValueGet(e: any): void {
    // if (typeof window !== 'undefined') {
    //   console.log('displayValue get: ', e);
    // }
  }

  onValueChange(e: any): void {
    // console.log(e);
  }
}
