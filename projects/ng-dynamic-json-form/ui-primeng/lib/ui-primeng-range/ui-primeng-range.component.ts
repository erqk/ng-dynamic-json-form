import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';
import { Slider, SliderModule } from 'primeng/slider';

@Component({
  selector: 'ui-primeng-range',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SliderModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: Slider,
    },
  ],
  templateUrl: './ui-primeng-range.component.html',
  styles: [],
})
export class UiPrimengRangeComponent extends CustomControlComponent {
  override control = new FormControl(0);
}
