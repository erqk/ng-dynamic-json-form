import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiBasicComponent } from './components/ui-basic/ui-basic.component';
import { GridItemWrapperComponent } from './components/grid-item-wrapper/grid-item-wrapper.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NgDynamicJsonFormComponent } from './ng-dynamic-json-form.component';
import { FormControlLoaderDirective } from './directives/form-control-loader.directive';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [NgDynamicJsonFormComponent, FormControlLoaderDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    UiBasicComponent,
    GridItemWrapperComponent,
    ErrorMessageComponent,
  ],
  exports: [NgDynamicJsonFormComponent],
})
export class NgDynamicJsonFormModule {}
