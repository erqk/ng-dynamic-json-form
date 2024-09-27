import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepickerInput,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'mat-input',
        token: MatDatepickerInput,
      },
    ]),
  ],
  templateUrl: './ui-material-date.component.html',
  styles: [],
})
export class UiMaterialDateComponent extends CustomControlComponent {
  override control = new FormControl(new Date());
  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
