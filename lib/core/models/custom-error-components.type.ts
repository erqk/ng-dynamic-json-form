import { Type } from '@angular/core';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

export type CustomErrorComponents = {
  [key: string]: Type<ErrorMessageComponent>;
};
