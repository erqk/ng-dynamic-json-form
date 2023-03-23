import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { getValidators } from 'src/app/utils/validator-generator';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
  ],
})
export class FormControlComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() validators: string[] = [];

  formControl?: UntypedFormControl;

  writeValue(obj: any): void {
    if (!this.formControl) return;

    this.formControl.setValue(this.getInitialValue(obj));
  }
  registerOnChange(fn: any): void {
    this.formControl?.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.formControl?.markAllAsTouched();
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl?.disable() : this.formControl?.enable();
    this.formControl?.updateValueAndValidity();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.formControl) return null;
    return this.formControl.valid ? null : this.formControl.errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    return;
  }

  ngOnInit(): void {
    this.formControl = new UntypedFormControl('', {
      validators: getValidators(this.validators),
    });
  }

  private getInitialValue(input: any): any {
    if (input !== null && input !== '' && input !== undefined) {
      return input;
    }

    switch (typeof input) {
      case 'boolean':
        return false;

      case 'number':
        return 0;

      case 'string':
        return '';

      default:
        return null;
    }
  }
}
