import { Component } from '@angular/core';
import { JsonFormControlData } from './core/models/json-form-control-data.model';
import { JsonFormGroupData } from './core/models/json-form-group-data.model';
import { FormGeneratorService } from './services/form-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-dynamic-form';
  jsonString = '';

  testData: JsonFormGroupData = {
    form: [
      {
        label: 'Name',
        value: 'Andrew',
        validators: ['required', 'minLength:4', 'regex:\\w+'],
      },
      {
        label: 'Age',
        value: '18',
        validators: ['required', 'min:18', 'max:50'],
      },
      {
        label: 'Email',
        value: 'emailaddress@example.com',
        validators: ['required', 'email'],
      },
      {
        label: 'Address',
        value: {},
        child: {
          addressHome: [
            {
              label: 'Country',
              value: 'country name',
            },
            {
              label: 'State',
              value: 'State name',
            },
            {
              label: 'Postcode',
              value: '00000',
            },
          ],
          addressCompany: [
            {
              label: 'Country',
              value: 'country name',
            },
            {
              label: 'State',
              value: 'State name',
            },
            {
              label: 'Postcode',
              value: '11111',
            },
          ],
        },
      },
    ],
  };

  formGroupList: JsonFormGroupData | null = null;

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit(): void {}

  onJsonEditorChanged(value: string): void {
    this.jsonString = value;
  }

  generateForm(): void {
    try {
      const json = JSON.parse(this.jsonString);
      this.formGroupList = json;

      console.log(this.formGroupList);
    } catch (e) {
      throw 'JSON data invalid';
    }
  }
}
