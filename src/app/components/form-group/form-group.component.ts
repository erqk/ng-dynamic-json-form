import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, SimpleChanges } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormGroup
} from '@angular/forms';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { FormGeneratorService } from 'src/app/services/form-generator.service';
import { CvaBaseComponent } from '../cva-base/cva-base.component';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormGroupComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormGroupComponent),
      multi: true,
    },
  ],
})
export class FormGroupComponent extends CvaBaseComponent {
  @Input() label: string = '';
  @Input() data: JsonFormControlData[] = [];

  override form?: UntypedFormGroup;

  constructor(private formGeneratorService: FormGeneratorService) {
    super();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['data']) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form = this.formGeneratorService.generateFormGroup(this.data);
  }
}
