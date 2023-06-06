import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { CalendarModule } from 'primeng/calendar';
import { merge } from 'rxjs';
import { filter, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'ui-primeng-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './ui-primeng-date.component.html',
  styles: [],
})
export class UiPrimengDateComponent extends NgDynamicJsonFormCustomComponent {
  private locale = inject(LOCALE_ID);

  minDate?: Date;
  maxDate?: Date;

  dateControl = new FormControl('');

  override ngOnInit(): void {
    super.ngOnInit();
    this.setMinMaxDate();
    this.bindControl();
  }

  private setMinMaxDate(): void {
    const min = this.data?.extra?.date?.min;
    const max = this.data?.extra?.date?.max;

    if (!min || !max) return;

    this.minDate = new Date(min);
    this.minDate = new Date(max);
  }

  private bindControl(): void {
    if (!this.control) return;

    const valueChanges$ = this.dateControl.valueChanges.pipe(
      startWith(this.dateControl.value),
      filter((x) => !!x),
      tap((x) => {
        const outputFormat = this.data?.extra?.date?.outputFormat;
        this.control?.setValue(
          outputFormat ? formatDate(x!, outputFormat, this.locale) : x
        );
      })
    );

    const statusChanges$ = this.control.statusChanges.pipe(
      startWith(this.control.status),
      tap((x) => {
        if (x === 'DISABLED') {
          this.dateControl.disable({ emitEvent: false });
        } else {
          this.dateControl.enable({ emitEvent: false });
        }
      })
    );

    merge(statusChanges$, valueChanges$).subscribe();
  }
}
