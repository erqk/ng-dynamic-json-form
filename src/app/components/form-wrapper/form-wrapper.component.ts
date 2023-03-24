import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlComponent],
})
export class FormWrapperComponent {
  @Input() label: string = '';
  @Input() data: JsonFormControlData[] = [];

  form?: UntypedFormGroup;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['data']) {
      this.generateFormControls();
    }
  }

  ngOnInit(): void {
    this.form?.valueChanges.subscribe((x) => console.log(this.form));
  }

  generateFormControls(): void {
    this.form = new UntypedFormGroup({});
    for (const item of this.data) {
      this.form.addControl(item.formControlName, new FormControl(item.value));
    }
  }
}
