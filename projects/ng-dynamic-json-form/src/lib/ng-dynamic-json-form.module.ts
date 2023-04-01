import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { NgDynamicJsonFormComponent } from './components/ng-dynamic-json-form/ng-dynamic-json-form.component';

@NgModule({
  declarations: [NgDynamicJsonFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormControlComponent, FormGroupComponent],
  exports: [NgDynamicJsonFormComponent],
})
export class NgDynamicJsonFormModule {}
