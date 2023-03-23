import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
  ],
})
export class FormControlComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() valueType: any = '';
  @Input() value: any = '';
  @Input() validators: string[] = [];

  formControl?: AbstractControl;

  writeValue(obj: any): void {
    if (!obj || !this.formControl) return;

    this.formControl.setValue(obj);
    console.log(obj);
  }
  registerOnChange(fn: any): void {
    this.formControl?.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.initFormControl();
  }

  initFormControl(): void {
    if (!this.value) {
      this.formControl = new FormControl('');
      return;
    }

    if (typeof this.value !== this.valueType) {
      throw `${this.value} is not a type of ${this.valueType}!`;
    }

    this.formControl = new FormControl(this.value, {
      validators: [],
    });
  }
}
