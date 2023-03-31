import { NgModule } from '@angular/core';
import { NgDynamicJsonFormComponent } from './ng-dynamic-json-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './components/form-group/form-group.component';

@NgModule({
  declarations: [NgDynamicJsonFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormGroupComponent],
  exports: [NgDynamicJsonFormComponent],
})
export class NgDynamicJsonFormModule {}
