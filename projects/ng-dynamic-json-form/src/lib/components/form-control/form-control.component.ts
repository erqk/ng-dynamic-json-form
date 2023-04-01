import { CommonModule } from '@angular/common';
import { Component, forwardRef, Host, HostBinding, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { CvaBaseComponent } from '../cva-base/cva-base.component';
import { NgDynamicJsonFormConfig } from '../../models/form-control-config.model';
import { getValidators } from '../../utils/validator-generator';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styles: [],
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
  @Input() data: NgDynamicJsonFormConfig | null = null;

  @HostBinding('class.form-control-container')
  formControlClass = true;
  
  @HostBinding('class.grid-layout')
  get isGridLayout() {
    return this.data?.gridColumn || this.data?.gridRow;
  }

  @HostBinding('style.grid-row')
  get getGridRow() {
    return this.data?.gridRow ?? '';
  }

  @HostBinding('style.grid-column')
  get getGridColumn() {
    return this.data?.gridColumn ?? '';
  }

  override form?: UntypedFormControl;
  checkboxValues: any[] = [];

  override writeValue(obj: any): void {
    if (!this.form || obj === undefined || obj === null) return;

    if (!!this.data?.options?.length && !!obj.length) {
      switch (this.data.type) {
        case 'checkbox':
          this.checkboxValues = [...obj];
          break;
      }
    }

    this.form.setValue(this.getInitialValue(obj));
  }

  ngOnInit(): void {
    this.form = new UntypedFormControl('', {
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

    this.form?.setValue(this.checkboxValues);
  }
}
