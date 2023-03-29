import { Component } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { JsonFormGroupData } from './core/models/json-form-group-data.model';
import { FormGeneratorService } from './services/form-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-dynamic-form';

  jsonString = '';
  jsonParsed: JsonFormGroupData | null = null;
  formValue = null;

  formGroupListData: {
    formControlName: string;
    data: JsonFormGroupData;
  }[] = [];

  form?: UntypedFormGroup;
  formShadow?: UntypedFormGroup;
  reloading = false;

  reset$ = new Subject();

  constructor(private formGeneratorService: FormGeneratorService) {}

  onJsonEditorChanged(value: string): void {
    this.jsonString = value;
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
  }
}
