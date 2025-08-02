import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { Slider, SliderModule } from 'primeng/slider';

@Component({
  selector: 'ui-primeng-range',
  imports: [ReactiveFormsModule, SliderModule, PropsBindingDirective],
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
  onChange?: any;

  @ViewChild(Slider) sliderRef?: Slider;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
