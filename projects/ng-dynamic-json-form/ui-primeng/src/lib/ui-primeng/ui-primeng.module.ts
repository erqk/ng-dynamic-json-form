import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';
import { UiPrimengComponent } from './ui-primeng.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgDynamicJsonFormModule,
    UiPrimengComponent
  ],
  exports: [UiPrimengComponent],
})
export class NgDynamicJsonFormPrimeNgModule {}
