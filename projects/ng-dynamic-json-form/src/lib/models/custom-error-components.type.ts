import { Type } from '@angular/core';
import { ErrorMessageComponent } from '../../public-api';

export type CustomErrorComponents = {
  [key: string]: Type<ErrorMessageComponent>;
};
