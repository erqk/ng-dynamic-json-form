import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
import { NgDynamicJsonFormConfig, NgDynamicJsonFormModule } from 'ng-dynamic-json-form';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { CustomInputComponent } from '../../example/components/custom-input/custom-input.component';
import { firstUppercaseValidator } from '../../example/validators/first-uppercase.validator';
import { JsonInputComponent } from '../../shared/json-input/json-input.component';

@Component({
  selector: 'app-page-playground',
  standalone: true,
  imports: [CommonModule, JsonInputComponent, NgDynamicJsonFormModule],
  templateUrl: './page-playground.component.html',
  styleUrls: ['./page-playground.component.scss']
})
export class PagePlaygroundComponent {

  jsonData: NgDynamicJsonFormConfig[] = [];
  private _jsonString = '';

  form?: UntypedFormGroup;

  customValidators = {
    firstUppercase: firstUppercaseValidator,
  };

  customComponents = {
    'custom-input': CustomInputComponent,
  };

  customUIComponentList = UI_PRIMENG_COMPONENTS;

  onJsonEditorChanged(value: string): void {
    this._jsonString = value;
  }

  onFormGet(e: UntypedFormGroup): void {
    this.form = e;
  }

  // Update form manually to prevent form binding errors when JSON is invalid
  generateForm(): void {
    try {
      this.jsonData = JSON.parse(this._jsonString);
    } catch {
      throw 'Invalid JSON';
    }
  }
}
