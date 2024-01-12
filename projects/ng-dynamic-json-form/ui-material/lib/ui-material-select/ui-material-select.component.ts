import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [MatSelect],
    },
  ],
  templateUrl: './ui-material-select.component.html',
  styles: [],
})
export class UiMaterialSelectComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');
}
