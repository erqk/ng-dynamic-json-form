import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { FormControlComponent } from '../form-control/form-control.component';
import { FormArrayComponent } from '../form-array/form-array.component';
import { CvaBaseComponent } from '../cva-base/cva-base.component';
import { NgDynamicJsonFormConfig } from '../../models/form-control-config.model';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    FormArrayComponent,
  ],
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
  @Input() data: NgDynamicJsonFormConfig[] = [];

  @HostBinding('class.form-group-container')
  formGroupClass = true;

  override form?: UntypedFormGroup;

  constructor(private formGeneratorService: FormGeneratorService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formGeneratorService.generateFormGroup(this.data, true);
  }
}
