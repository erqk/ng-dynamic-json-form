import { Component, input, output, viewChild } from '@angular/core';
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
import { CustomErrorMessageComponent } from 'src/app/example/components/custom-error-message/custom-error-message.component';
import { CustomLoadingComponent } from 'src/app/example/components/custom-loading/custom-loading.component';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { letterStartsWithAValidator } from 'src/app/example/validators/letter-starts-with-a.async.validator';
import { textareaMaxLengthValidator } from 'src/app/example/validators/textarea-max-length.validator';

@Component({
  selector: 'app-playground-form',
  imports: [ReactiveFormsModule, NgDynamicJsonFormComponent],
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
        textareaMaxLength: textareaMaxLengthValidator,
      },
      customAsyncValidators: {
        letterStartsWithA: letterStartsWithAValidator,
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
  configs = input<FormControlConfig[]>([]);
  customComponents = input<CustomComponents>();
  control = input<FormControl>(new FormControl());
  hideErrorMessage = input<boolean | undefined>(undefined);

  optionsSources =
    input<ReturnType<NgDynamicJsonFormComponent['optionsSources']>>();

  formGet = output<UntypedFormGroup>();

  // To make the component instance accessible from parent component
  formRef = viewChild(NgDynamicJsonFormComponent);

  onFormGet(e: UntypedFormGroup): void {
    this.formGet.emit(e);
  }
}
