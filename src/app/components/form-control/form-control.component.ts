import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    }
  ]
})
export class FormControlComponent implements ControlValueAccessor {
  @Input() label = '';

  formControl?: AbstractControl;

  writeValue(obj: any): void {
    if (!obj || !this.formControl) return;

    this.formControl.setValue(obj);
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
    
  }

  initFormControl(): void {
    this.formControl = new FormControl();
  }
}
