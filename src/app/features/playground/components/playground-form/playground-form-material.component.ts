import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgDynamicJsonFormComponent,
  provideNgDynamicJsonForm,
} from 'ng-dynamic-json-form';
import { UI_MATERIAL_COMPONENTS } from 'ng-dynamic-json-form/ui-material';
import { CustomErrorMessageComponent } from 'src/app/example/components/custom-error-message/custom-error-message.component';
import { CustomLoadingComponent } from 'src/app/example/components/custom-loading/custom-loading.component';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';
import { PlaygroundFormComponent } from './playground-form.component';

@Component({
  selector: 'app-playground-form-material',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgDynamicJsonFormComponent],
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
      },
      loadingComponent: CustomLoadingComponent,
      errorComponent: CustomErrorMessageComponent,
      uiComponents: UI_MATERIAL_COMPONENTS,
    }),
  ],
  templateUrl: './playground-form.component.html',
  styleUrls: ['./playground-form.component.scss'],
})
export class PlaygroundFormMaterialComponent extends PlaygroundFormComponent {}
