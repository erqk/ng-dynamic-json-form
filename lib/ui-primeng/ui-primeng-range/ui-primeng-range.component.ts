import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { Slider, SliderModule } from 'primeng/slider';

@Component({
  selector: 'ui-primeng-range',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SliderModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-slider',
        token: Slider,
      },
    ]),
  ],
  templateUrl: './ui-primeng-range.component.html',
  styles: [],
})
export class UiPrimengRangeComponent extends CustomControlComponent {
  override control = new FormControl(0);
}
