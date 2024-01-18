import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';
import { Calendar, CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'ui-primeng-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [Calendar],
    },
  ],
  templateUrl: './ui-primeng-date.component.html',
  styles: [],
})
export class UiPrimengDateComponent extends CustomControlComponent {
  override control = new FormControl(new Date());

  minDate?: Date;
  maxDate?: Date;

  ngOnInit(): void {
    this._setMinMaxDate();
  }

  private _setMinMaxDate(): void {
    const min = this.data?.extra?.date?.min;
    const max = this.data?.extra?.date?.max;

    if (!min || !max) return;

    this.minDate = new Date(min);
    this.minDate = new Date(max);
  }
}
