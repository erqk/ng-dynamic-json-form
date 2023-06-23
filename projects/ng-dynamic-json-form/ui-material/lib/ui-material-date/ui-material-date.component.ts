import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { delay, map } from 'rxjs';
import { startWith } from 'rxjs/operators';

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
  ],
  templateUrl: './ui-material-date.component.html',
  styles: [],
})
export class UiMaterialDateComponent extends NgDynamicJsonFormCustomComponent {
  private _locale = inject(LOCALE_ID);

  override viewControl = new FormControl(new Date());

  override readControlValue(obj: any): void {
    if (!obj) return;
    this.viewControl.setValue(new Date(obj));
  }

  override registerControlChange(fn: any): void {
    this.viewControl.valueChanges
      .pipe(
        startWith(this.viewControl.value),
        delay(0),
        map((x) => {
          const outputFormat = this.data?.extra?.date?.outputFormat;
          return outputFormat ? formatDate(x!, outputFormat, this._locale) : x;
        })
      )
      .subscribe(fn);
  }
}
