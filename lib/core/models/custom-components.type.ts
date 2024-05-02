import { Type } from '@angular/core';
import { CustomControlComponent } from '../components/custom-control/custom-control.component';

export type CustomComponents = {
  [key: string]: Type<CustomControlComponent>;
};
