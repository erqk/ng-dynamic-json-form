import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomComponents,
  FormControlConfig,
  NgDynamicJsonFormComponent,
  provideNgDynamicJsonForm,
} from 'ng-dynamic-json-form';
import { CustomErrorMessageComponent } from 'src/app/example/components/custom-error-message/custom-error-message.component';
import { CustomFormTitleComponent } from 'src/app/example/components/custom-form-title/custom-form-title.component';
import { CustomLoadingComponent } from 'src/app/example/components/custom-loading/custom-loading.component';
import { firstUppercaseValidator } from 'src/app/example/validators/first-uppercase.validator';

@Component({
  selector: 'app-playground-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgDynamicJsonFormComponent],
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
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

  ngOnInit(): void {
    this.control.valueChanges.subscribe((x) => console.log(x));
  }

  onOptionsLoaded(): void {
    console.log('Options loaded');
  }
}
