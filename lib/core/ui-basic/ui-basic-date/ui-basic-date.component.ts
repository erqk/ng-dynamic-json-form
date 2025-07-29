import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-date',
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-date.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicDateComponent extends CustomControlComponent {
  private locale = inject(LOCALE_ID);
  private onChange?: any;

  dateSettings = computed(() => {
    const { min, max } = this.data()?.props ?? {};
    return {
      min: !min ? '' : formatDate(min, 'yyyy-MM-dd', this.locale),
      max: !max ? '' : formatDate(max, 'yyyy-MM-dd', this.locale),
    };
  });

  override control = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
  });

  override writeValue(obj: any): void {
    if (!obj) return;

    const dateRaw = formatDate(obj, 'yyyy-MM-dd,HH:mm:ss', this.locale);
    this.control.patchValue({
      date: dateRaw.split(',')[0],
      time: dateRaw.split(',')[1],
    });
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  emitValue(): void {
    const { date, time } = this.control.value;

    if (!date) {
      return;
    }

    const _date = new Date(date);

    if (time) {
      const [hours, minutes, seconds] = time.split(':');
      if (hours) _date.setHours(parseInt(hours));
      if (minutes) _date.setMinutes(parseInt(minutes));
      if (seconds) _date.setSeconds(parseInt(seconds));
    }

    this.onChange(_date);
  }
}
