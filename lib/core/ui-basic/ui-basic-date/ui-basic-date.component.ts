import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  HostBinding,
  LOCALE_ID,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-date.component.html',
  styles: [],
})
export class UiBasicDateComponent
  extends CustomControlComponent
  implements OnInit
{
  private _locale = inject(LOCALE_ID);
  private _onChange?: any;

  dateSettings = { min: '', max: '' };

  @HostBinding('class') hostClass = 'ui-basic';

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
    this._onChange = fn;
  }

  ngOnInit(): void {
    const { min, max } = this.data?.props ?? {};
    this.dateSettings = {
      min: !min ? '' : formatDate(min, 'yyyy-MM-dd', this._locale),
      max: !max ? '' : formatDate(max, 'yyyy-MM-dd', this._locale),
    };
  }

  updateControl(): void {
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

    this._onChange(_date);
  }
}
