import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { FormControlComponent } from '../form-control/form-control.component';
import { CvaBaseComponent } from '../cva-base/cva-base.component';
import { NgDynamicJsonFormArrayConfig } from '../../models/form-array-config.model';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormArrayComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormArrayComponent),
      multi: true,
    },
  ],
})
export class FormArrayComponent extends CvaBaseComponent {
  @Input() label: string = '';
  @Input() data: NgDynamicJsonFormArrayConfig = {} as NgDynamicJsonFormArrayConfig;

  @HostBinding('class.form-array-container')
  formArrayClass = true;

  override form = new FormGroup({
    formArray: new UntypedFormArray([]),
  });

  constructor(private formGeneratorService: FormGeneratorService) {
    super();
  }

  override writeValue(obj: any): void {
    if (!obj || !Array.isArray(obj) || !obj.length) return;

    this.patchFormArray(obj);
  }

  override registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(
        debounceTime(0),
        map((x) => x.formArray)
      )
      .subscribe(fn);
  }

  private patchFormArray(arrayData?: any[]): void {
    if (!arrayData) return;

    this.form.controls.formArray.clear();
    for (const item of arrayData) {
      const formGroup = this.generateFormGroup();
      formGroup.patchValue(item);
      this.form.controls.formArray.push(formGroup);
    }

    this.form.controls.formArray.patchValue(arrayData);
  }

  private generateFormGroup(): UntypedFormGroup {
    return this.formGeneratorService.generateFormGroup(
      this.data.template,
      true
    );
  }

  addForm(index?: number): void {
    if (
      this.data.maxLength &&
      this.form.controls.formArray.length >= this.data.maxLength
    ) {
      return;
    }

    const formGroup = this.generateFormGroup();
    if (!index) {
      this.form.controls.formArray.push(formGroup);
    } else {
      this.form.controls.formArray.insert(index, formGroup);
    }
  }

  removeForm(index: number): void {
    if (
      this.data.minLength &&
      this.form.controls.formArray.length <= this.data.minLength
    ) {
      return;
    }

    this.form.controls.formArray.removeAt(index);
  }
}
