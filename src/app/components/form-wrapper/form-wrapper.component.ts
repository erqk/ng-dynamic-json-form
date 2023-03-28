import { CommonModule } from '@angular/common';
import {
  Component, forwardRef,
  Input, SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { generateFormGroup } from 'src/app/utils/form-group-generator';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormWrapperComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormWrapperComponent),
      multi: true,
    },
  ],
})
export class FormWrapperComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() data: JsonFormControlData[] = [];

  form?: UntypedFormGroup;

  writeValue(obj: any): void {
    if (!obj || !this.form) return;
    this.form?.patchValue(obj);
  }
  registerOnChange(fn: any): void {
    if (!this.form) return;
    this.form?.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.form?.markAllAsTouched();
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form?.disable() : this.form?.enable();
    this.form?.updateValueAndValidity();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.form) return null;
    return this.form.invalid ? this.form.errors : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.form?.updateValueAndValidity();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['data']) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form = generateFormGroup(this.data);
  }
}
