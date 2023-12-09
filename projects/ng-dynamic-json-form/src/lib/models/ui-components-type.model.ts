import { Type } from '@angular/core';
import { CustomControlComponent } from '../components/custom-control/custom-control.component';
import { FormControlType } from './form-control-type.model';

export type UiComponents = {
  [K in FormControlType]?: {
    type: 'basic' | 'primeng' | 'material' | 'custom';
    component: Type<CustomControlComponent>;
  };
};
