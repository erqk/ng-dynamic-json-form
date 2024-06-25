import { Type } from '@angular/core';
import { CustomControlComponent } from '../components/custom-control/custom-control.component';
import { FormControlType } from './form-control-type.type';

export type UiComponents = {
  [K in FormControlType]?: Type<CustomControlComponent>;
};
