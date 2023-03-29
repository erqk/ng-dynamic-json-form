import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { getValidators } from 'src/app/utils/validator-generator';
import { CvaBaseComponent } from '../cva-base/cva-base.component';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
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
export class FormControlComponent extends CvaBaseComponent {
  @Input() data: JsonFormControlData | null = null;

  override formControl?: UntypedFormControl;
  checkboxValues: any[] = [];

  override writeValue(obj: any): void {
    if (!this.formControl || (!obj && typeof obj !== 'boolean')) return;

    if (!!this.data?.options?.length && !!obj.length) {
      switch (this.data.type) {
        case 'checkbox':
          this.checkboxValues = [...obj];
          break;
      }
    }

    this.formControl.setValue(this.getInitialValue(obj));
  }

  ngOnInit(): void {
    this.formControl = new UntypedFormControl('', {
      validators: getValidators(this.data?.validators || []),
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

  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (!input.checked || this.checkboxValues.includes(input.value)) {
      this.checkboxValues = this.checkboxValues.filter(
        (x) => x !== input.value
      );
    } else {
      this.checkboxValues.push(input.value);
    }

    this.formControl?.setValue(this.checkboxValues);
  }
}
