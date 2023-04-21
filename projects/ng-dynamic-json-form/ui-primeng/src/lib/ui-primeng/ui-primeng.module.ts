import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { UiPrimengComponent } from './ui-primeng.component';
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';

@NgModule({
  declarations: [UiPrimengComponent],
  imports: [CommonModule, NgDynamicJsonFormModule, CalendarModule],
  exports: [UiPrimengComponent],
})
export class NgDynamicJsonFormPrimeNgModule {}
