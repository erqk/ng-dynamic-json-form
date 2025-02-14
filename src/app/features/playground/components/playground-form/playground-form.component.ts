import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgDynamicJsonFormComponent],
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
  @Input() configs: FormControlConfig[] = [];
  @Input() customComponents?: CustomComponents;
  @Input() control = new FormControl();
  @Input() optionsSources?: NgDynamicJsonFormComponent['optionsSources'];
  @Output() formGet = new EventEmitter<UntypedFormGroup>();

  // To be accessible by using @ViewChild(PlaygroundFormComponent)
  @ViewChild(NgDynamicJsonFormComponent, { static: true })
  formRef!: NgDynamicJsonFormComponent;

  onFormGet(e: UntypedFormGroup): void {
    this.formGet.emit(e);
  }
}
