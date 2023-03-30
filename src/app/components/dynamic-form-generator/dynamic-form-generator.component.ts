import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import { JsonFormGroupData } from 'src/app/core/models/json-form-group-data.model';
import { FormGeneratorService } from 'src/app/services/form-generator.service';
import { clearEmpties } from 'src/app/utils/clear-empties';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'app-dynamic-form-generator',
  templateUrl: './dynamic-form-generator.component.html',
  styleUrls: ['./dynamic-form-generator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormGroupComponent],
})
export class DynamicFormGeneratorComponent {
  @Input() jsonString = '';
  @Output() formGet = new EventEmitter();

  jsonParsed: JsonFormGroupData | null = null;

  form?: UntypedFormGroup;
  shadowForm?: UntypedFormGroup;

  reload = false;

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['jsonString']) {
      this.buildForm(this.parseJsonData());
    }
  }

  private parseJsonData(): JsonFormGroupData {
    try {
      this.jsonParsed = JSON.parse(this.jsonString);
      return this.jsonParsed!;
    } catch (e) {
      throw 'JSON data invalid';
    }
  }

  private buildForm(jsonParsed: JsonFormGroupData): void {
    if (!jsonParsed) return;

    this.reload = true;

    this.form = new UntypedFormGroup({});
    this.shadowForm = new UntypedFormGroup({});

    for (const key in jsonParsed) {
      const formGroup = this.formGeneratorService.generateFormGroup(
        jsonParsed[key]
      );

      const formGroupShadow =
        this.formGeneratorService.generateFormGroupWithValidation(
          jsonParsed[key]
        );

      this.form.addControl(key, new FormControl(formGroup.value));
      this.shadowForm.addControl(key, formGroupShadow);
    }

    this.form.valueChanges.subscribe((x) => this.updateFormStatus());

    // Initiate form on the next tick to prevent
    // "There is no FormControl instance attached to form control element with name: XXX" error
    setTimeout(() => {
      this.reload = false;
      this.updateFormStatus();
    }, 0);
  }

  private updateFormStatus(): void {
    if (!this.form) return;

    const getFormErrors = (input: UntypedFormControl | UntypedFormGroup) => {
      const isFormGroup = 'controls' in input;

      if (!isFormGroup) {
        return JSON.parse(JSON.stringify(input.errors));
      }

      const errors = Object.keys(input.controls).reduce((acc, key) => {
        const formControlErrors = getFormErrors(
          input.controls[key] as UntypedFormControl
        );

        if (!!formControlErrors) {
          acc = {
            ...acc,
            [key]: formControlErrors,
          };
        }

        return acc;
      }, {});

      return JSON.parse(JSON.stringify(errors));
    };

    this.shadowForm?.patchValue(this.form.getRawValue());

    if (this.shadowForm?.invalid) {
      const errors = getFormErrors(this.shadowForm);
      this.form?.setErrors(clearEmpties(errors));
    }

    this.formGet.emit(this.form);
  }
}
