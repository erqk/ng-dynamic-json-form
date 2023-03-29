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
}
