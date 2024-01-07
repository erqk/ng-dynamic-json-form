import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: CdkTextareaAutosize,
    },
  ],
  templateUrl: './ui-material-textarea.component.html',
  styles: [],
})
export class UiMaterialTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');
}
