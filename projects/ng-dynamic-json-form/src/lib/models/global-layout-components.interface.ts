import { Type } from '@angular/core';
import {
  ErrorMessageComponent,
  FormArrayItemHeaderComponent,
  FormTitleComponent,
} from '../../public-api';

export interface GlobalLayoutComponents {
  loading?: Type<any>;
  errorMessage?: Type<ErrorMessageComponent>;
  formArrayItemHeader?: Type<FormArrayItemHeaderComponent>;
  formTitle?: Type<FormTitleComponent>;
}
