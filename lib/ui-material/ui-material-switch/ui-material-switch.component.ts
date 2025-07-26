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
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';

@Component({
    selector: 'ui-material-switch',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatInputModule,
        PropsBindingDirective,
    ],
    providers: [
        providePropsBinding([
            {
                key: 'mat-slide-toggle',
                token: MatSlideToggle,
            },
        ]),
    ],
    templateUrl: './ui-material-switch.component.html',
    styles: []
})
export class UiMaterialSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
