import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiBasicComponent } from './components/ui-basic/ui-basic.component';
import { GridItemWrapperComponent } from './components/grid-item-wrapper/grid-item-wrapper.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NgDynamicJsonFormComponent } from './ng-dynamic-json-form.component';
import { FormControlLoaderDirective } from './directives/form-control-loader.directive';

@NgModule({
  declarations: [NgDynamicJsonFormComponent, FormControlLoaderDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiBasicComponent,
    GridItemWrapperComponent,
    ErrorMessageComponent,
  ],
  exports: [NgDynamicJsonFormComponent, UiBasicComponent],
})
export class NgDynamicJsonFormModule {}
