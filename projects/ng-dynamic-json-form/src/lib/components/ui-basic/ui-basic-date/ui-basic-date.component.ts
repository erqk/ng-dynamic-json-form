import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { merge, tap } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';

@Component({
  selector: 'ui-basic-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-date.component.html',
  styles: [],
})
export class UiBasicDateComponent extends NgDynamicJsonFormCustomComponent {
  private locale = inject(LOCALE_ID);

  dateControl = new FormControl('');
  timeControl = new FormControl('');

  ngOnInit(): void {
    this.initControlValue();
    this.bindControl();
  }

  private get dateTimeFormatted(): string {
    const outputFormat = this.data?.extra?.date?.outputFormat;

    const date =
      this.data?.extra?.date?.selectTime === true
        ? new Date(`${this.dateControl.value}T${this.timeControl.value}`)
        : new Date(this.dateControl.value!);

    const dateISO = date.toISOString();

    return outputFormat
      ? formatDate(dateISO, outputFormat, this.locale)
      : dateISO;
  }

  private initControlValue(): void {
    if (!this.data?.value) return;

    const dateRaw = formatDate(
      this.data.value,
      'yyyy-MM-dd,HH:mm:ss',
      this.locale
    );

    this.dateControl.setValue(dateRaw.split(',')[0]);
    this.timeControl.setValue(dateRaw.split(',')[1]);
  }

  private bindControl(): void {
    if (!this.control) return;

    const valueChanges$ = merge(
      this.dateControl.valueChanges,
      this.timeControl.valueChanges
    ).pipe(
      filter(() => !!this.dateControl.value && !!this.timeControl.value),
      tap(() => this.control?.setValue(this.dateTimeFormatted))
    );

    const statusChanges$ = this.control?.statusChanges.pipe(
      startWith(this.control.status),
      tap((x) => {
        if (x === 'DISABLED') {
          this.dateControl.disable({ emitEvent: false });
          this.timeControl.disable({ emitEvent: false });
        } else {
          this.dateControl.enable({ emitEvent: false });
          this.timeControl.enable({ emitEvent: false });
        }
      })
    );

    merge(statusChanges$, valueChanges$).subscribe();
  }
}
