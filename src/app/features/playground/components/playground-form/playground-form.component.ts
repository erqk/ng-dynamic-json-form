import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  onOptionsLoaded(): void {
    console.log('Options loaded');
  }

  onFormGet(e: UntypedFormGroup): void {
    console.log('form get', e);
  }

  onDisplayValueGet(e: any): void {
    console.log('displayValue get: ', e);
  }
}
