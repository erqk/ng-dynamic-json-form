import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-switch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: MatSlideToggle,
    },
  ],
  templateUrl: './ui-material-switch.component.html',
  styles: [],
})
export class UiMaterialSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
}
