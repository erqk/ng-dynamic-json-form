import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { FormGeneratorService } from 'src/app/services/form-generator.service';
import { getValidators } from 'src/app/utils/validator-generator';
import { CvaBaseComponent } from '../cva-base/cva-base.component';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  @Input() count: number = 1;
  @Input() data: JsonFormControlData[] = [];

  override form = new UntypedFormArray([]);

  constructor(private formGeneratorService: FormGeneratorService) {
    super();
  }

  override writeValue(obj: any): void {
    if (!obj || !Array.isArray(obj) || !obj.length) return;

    for (const item of obj) {
      const formGroup = this.createFormGroup();
      formGroup.patchValue(item);
      this.form.push(formGroup);
    }
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  private createFormGroup(): UntypedFormGroup {
    const formGroup = this.formGeneratorService.generateFormGroup(
      this.data,
      true
    );
    return formGroup;
  }
}
