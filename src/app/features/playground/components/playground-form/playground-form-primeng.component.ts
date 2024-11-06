import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgDynamicJsonFormComponent,
  provideNgDynamicJsonForm,
} from 'ng-dynamic-json-form';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { CustomErrorMessageComponent } from 'src/app/example/components/custom-error-message/custom-error-message.component';
import { CustomLoadingComponent } from 'src/app/example/components/custom-loading/custom-loading.component';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { textareaMaxLength } from 'src/app/example/validators/textarea-max-length.validator';
import { PlaygroundFormComponent } from './playground-form.component';

@Component({
  selector: 'app-playground-form-primeng',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgDynamicJsonFormComponent],
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
        textareaMaxLength,
      },
      loadingComponent: CustomLoadingComponent,
      errorComponent: CustomErrorMessageComponent,
      uiComponents: UI_PRIMENG_COMPONENTS,
    }),
    {
      provide: PlaygroundFormComponent,
      useExisting: forwardRef(() => PlaygroundFormPrimengComponent),
    },
  ],
  templateUrl: './playground-form.component.html',
  styleUrls: ['./playground-form.component.scss'],
})
export class PlaygroundFormPrimengComponent extends PlaygroundFormComponent {}
