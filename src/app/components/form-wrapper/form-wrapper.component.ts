import { CommonModule } from '@angular/common';
import {
  Component, forwardRef,
  Input, SimpleChanges
} from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormGroup
} from '@angular/forms';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { generateFormGroup } from 'src/app/utils/form-group-generator';
import { CvaBaseComponent } from '../cva-base/cva-base.component';
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
export class FormWrapperComponent extends CvaBaseComponent {
  @Input() label: string = '';
  @Input() data: JsonFormControlData[] = [];

  override form?: UntypedFormGroup;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['data']) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form = generateFormGroup(this.data);
  }
}
