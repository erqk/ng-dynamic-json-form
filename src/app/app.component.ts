import { Component } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { JsonFormGroupData } from './core/models/json-form-group-data.model';
import { generateFormGroup } from './utils/form-group-generator';

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
  reloading = false;

  reset$ = new Subject();

  onJsonEditorChanged(value: string): void {
    this.jsonString = value;
  }

  generateForm(): void {
    try {
      this.jsonParsed = JSON.parse(this.jsonString);
    } catch (e) {
      throw 'JSON data invalid';
    }

    if (!this.jsonParsed) return;

    this.reloading = true;
    this.reset$.next(null);
    this.form = new UntypedFormGroup({});
    for (const key in this.jsonParsed) {
      const formGroup = generateFormGroup(this.jsonParsed[key]);
      this.form.addControl(key, new FormControl(formGroup.value));
    }

    // instantiate form using next tick to prevent binding error
    setTimeout(() => {
      this.reloading = false;
    }, 0);

    this.form.valueChanges.pipe(takeUntil(this.reset$)).subscribe((x) => {
      console.log(this.form);
    });
  }
}
