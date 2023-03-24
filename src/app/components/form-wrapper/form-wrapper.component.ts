import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup
} from '@angular/forms';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlComponent],
})
export class FormWrapperComponent {
  @Input() label: string = '';
  @Input() data: JsonFormControlData[] = [];

  form?: UntypedFormGroup;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['data']) {
      this.generateFormControls();
    }
  }

  generateFormControls(): void {
    this.form = new UntypedFormGroup({});
    for (const item of this.data) {
      this.form.addControl(item.formControlName, new FormControl(item.value));
    }
  }
}
