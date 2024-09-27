import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
export class UiPrimengRangeComponent
  extends CustomControlComponent
  implements AfterViewInit
{
  private _pendingValue = 0;

  override control = new FormControl(0);
  onChange?: any;

  @ViewChild(Slider) sliderRef?: Slider;

  override writeValue(obj: any): void {
    super.writeValue(obj);
    this._pendingValue = obj;
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  ngAfterViewInit(): void {
    this.sliderRef?.updateValue(this._pendingValue);
  }
}
