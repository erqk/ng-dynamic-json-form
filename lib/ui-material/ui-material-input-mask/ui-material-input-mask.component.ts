import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { IMaskDirective } from 'angular-imask';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    IMaskDirective,
    PropsBindingDirective,
  ],
  templateUrl: './ui-material-input-mask.component.html',
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'mat-input',
          token: MatInput,
        },
      ],
    },
  ],
  styles: [],
})
export class UiMaterialInputMaskComponent extends CustomControlComponent {
  override control = new FormControl('');
}
