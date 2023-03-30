import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-dynamic-form';

  jsonString = '';
  private _jsonString = '';

  form?: UntypedFormGroup;

  onJsonEditorChanged(value: string): void {
    this._jsonString = value;
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
  }

  // Update form manually to prevent form binding errors when JSON is invalid
  generateForm(): void {
    this.jsonString = this._jsonString;
  }

  patchForm(): void {
    const dataToOverwrite = {
      form: {
        basicInfo: {
          name: 'NAMEEEEEEE',
          age: '18',
          gender: '0',
          status: false,
          email: '1233123123@example.com',
          creditCardTypes: [''],
          carBrand: '0',
          address: {
            country: 'SSS name',
            state: 'State name',
            postcode: '1123124',
          },
          familyMemberInfo: [
            {
              name: 'MemberA',
              email: '',
              relationship: 0,
            },
          ],
        },
      },
    };

    this.form?.patchValue(dataToOverwrite)
  }
}
