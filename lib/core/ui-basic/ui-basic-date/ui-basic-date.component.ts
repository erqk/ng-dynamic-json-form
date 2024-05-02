import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import {
  CustomControlComponent,
  NG_DYNAMIC_JSON_FORM_CONFIG,
  PropsBindingDirective,
} from '../../../public-api';

@Component({
  selector: 'ui-basic-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-date.component.html',
  styles: [],
})
export class UiBasicDateComponent extends CustomControlComponent {
  private _locale = inject(LOCALE_ID);
  private _formConfig = inject(NG_DYNAMIC_JSON_FORM_CONFIG, { optional: true });

  dateSettings = {
    min: '',
    max: '',
  };

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

  ngOnInit(): void {
    this._setMinMaxDate();
  }

  private get _dateTimeFormatted(): string {
    const controlValue = this.control.value;
    const date =
      this.data?.extra?.showTime === true
        ? new Date(`${controlValue.date}T${controlValue.time}`)
        : new Date(controlValue.time!);

    return JSON.stringify(date);
  }

  private _setMinMaxDate(): void {
    if (!this.data?.extra) return;

    const { min = '', max = '' } = this.data.extra;

    if (min) {
      this.dateSettings.min = formatDate(min, 'yyyy-MM-dd', this._locale);
    }

    if (max) {
      this.dateSettings.max = formatDate(max, 'yyyy-MM-dd', this._locale);
    }
  }
}
