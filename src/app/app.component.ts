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
