import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { Calendar, CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'ui-primeng-date',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CalendarModule,
        FormsModule,
        PropsBindingDirective,
    ],
    providers: [
        providePropsBinding([
            {
                key: 'p-calendar',
                token: Calendar,
            },
        ]),
    ],
    templateUrl: './ui-primeng-date.component.html',
    styles: []
})
export class UiPrimengDateComponent extends CustomControlComponent {
  private _onChange?: any;

  override control = new FormControl(new Date());

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  updateControl(): void {
    this._onChange(this.control.value);
  }
}
