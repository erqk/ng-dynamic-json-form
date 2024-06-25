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
  standalone: true,
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
  styles: [],
})
export class UiPrimengDateComponent extends CustomControlComponent {
  override control = new FormControl(new Date());
}
