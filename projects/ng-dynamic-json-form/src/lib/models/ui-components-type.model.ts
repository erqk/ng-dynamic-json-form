import { Type } from '@angular/core';
import { FormControlType } from './form-control-type.model';
import { NgDynamicJsonFormCustomComponent } from '../components/custom-component-base/custom-component-base.component';

export type UiComponents = {
  [K in FormControlType]?: Type<NgDynamicJsonFormCustomComponent>;
};
