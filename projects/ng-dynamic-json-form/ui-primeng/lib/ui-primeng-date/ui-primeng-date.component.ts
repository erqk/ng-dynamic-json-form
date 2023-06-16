import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { CalendarModule } from 'primeng/calendar';
import { map } from 'rxjs';

@Component({
  selector: 'ui-primeng-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule, FormsModule],
  templateUrl: './ui-primeng-date.component.html',
  styles: [],
})
export class UiPrimengDateComponent extends NgDynamicJsonFormCustomComponent {
  private locale = inject(LOCALE_ID);

  override viewControl = new FormControl(new Date());
  minDate?: Date;
  maxDate?: Date;

  override ngOnInit(): void {
    super.ngOnInit();
    this.setMinMaxDate();
  }

  override readControlValue(obj: any): void {
    if (!obj) return;
    this.viewControl.setValue(new Date(obj));
  }

  override registerControlChange(fn: any): void {
    this.viewControl.valueChanges
      .pipe(
        map((x) => {
          const outputFormat = this.data?.extra?.date?.outputFormat;
          return outputFormat ? formatDate(x!, outputFormat, this.locale) : x;
        })
      )
      .subscribe(fn);
  }

  private setMinMaxDate(): void {
    const min = this.data?.extra?.date?.min;
    const max = this.data?.extra?.date?.max;

    if (!min || !max) return;

    this.minDate = new Date(min);
    this.minDate = new Date(max);
  }
}
