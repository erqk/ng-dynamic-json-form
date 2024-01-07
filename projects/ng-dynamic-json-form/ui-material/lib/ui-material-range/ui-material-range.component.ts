import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-range',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: MatSlider,
    },
  ],
  templateUrl: './ui-material-range.component.html',
  styles: [],
})
export class UiMaterialRangeComponent extends CustomControlComponent {
  override control = new FormControl(0);
}
