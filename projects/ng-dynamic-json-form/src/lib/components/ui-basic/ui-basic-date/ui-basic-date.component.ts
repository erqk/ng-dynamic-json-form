import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { CustomControlComponent } from '../../custom-control/custom-control.component';

@Component({
  selector: 'ui-basic-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-date.component.html',
  styles: [],
})
export class UiBasicDateComponent extends CustomControlComponent {
  private _locale = inject(LOCALE_ID);

  override control = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
  });

  override writeValue(obj: any): void {
    if (!obj) return;

    const dateRaw = formatDate(obj, 'yyyy-MM-dd,HH:mm:ss', this._locale);
    this.control.patchValue({
      date: dateRaw.split(',')[0],
      time: dateRaw.split(',')[1],
    });
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(
        filter((x) => !!x.date && !!x.time),
        map(() => this._dateTimeFormatted)
      )
      .subscribe(fn);
  }

  private get _dateTimeFormatted(): string {
    const outputFormat = this.data?.extra?.date?.outputFormat;
    const controlValue = this.control.value;
    const date =
      this.data?.extra?.date?.selectTime === true
        ? new Date(`${controlValue.date}T${controlValue.time}`)
        : new Date(controlValue.time!);

    const dateISO = date.toISOString();

    return outputFormat
      ? formatDate(dateISO, outputFormat, this._locale)
      : dateISO;
  }
}
