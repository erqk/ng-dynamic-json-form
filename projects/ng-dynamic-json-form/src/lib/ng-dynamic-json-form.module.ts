import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './components/form-control/form-control.component';
import { GridItemWrapperComponent } from './components/grid-item-wrapper/grid-item-wrapper.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NgDynamicJsonFormComponent } from './ng-dynamic-json-form.component';

@NgModule({
  declarations: [NgDynamicJsonFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    GridItemWrapperComponent,
    ErrorMessageComponent,
  ],
  exports: [NgDynamicJsonFormComponent, FormControlComponent],
})
export class NgDynamicJsonFormModule {}
