import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './components/form-control/form-control.component';
import { GridItemWrapperComponent } from './components/grid-item-wrapper/grid-item-wrapper.component';
import { NgDynamicJsonFormComponent } from './components/ng-dynamic-json-form/ng-dynamic-json-form.component';

@NgModule({
  declarations: [NgDynamicJsonFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    GridItemWrapperComponent,
  ],
  exports: [NgDynamicJsonFormComponent],
})
export class NgDynamicJsonFormModule {}
