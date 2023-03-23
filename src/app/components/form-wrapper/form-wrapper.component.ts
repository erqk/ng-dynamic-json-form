import { CommonModule } from '@angular/common';
import {
  Component, Input,
  SimpleChanges
} from '@angular/core';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule, FormControlComponent],
})
export class FormWrapperComponent {
  @Input() label: string = '';
  @Input() data: JsonFormControlData[] = [];

  formControlsData: JsonFormControlData[] = [];

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['data']) {
      this.generateFormControls();
    }
  }

  generateFormControls(): void {
    this.formControlsData = this.data.map((x) => ({
      ...x,
      valueType: typeof x.value,
    }));
  }
}
