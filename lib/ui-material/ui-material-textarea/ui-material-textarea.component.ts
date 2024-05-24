import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'cdk-textarea-autosize',
          token: CdkTextareaAutosize,
        },
        {
          key: 'mat-input',
          token: MatInput,
        },
      ],
    },
  ],
  templateUrl: './ui-material-textarea.component.html',
  styles: [],
})
export class UiMaterialTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');
}
