
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';

@Component({
    selector: 'ui-material-range',
    imports: [
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    PropsBindingDirective
],
    providers: [
        providePropsBinding([
            {
                key: 'mat-slider',
                token: MatSlider,
            },
        ]),
    ],
    templateUrl: './ui-material-range.component.html',
    styles: []
})
export class UiMaterialRangeComponent extends CustomControlComponent {
  override control = new FormControl(0);
  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
