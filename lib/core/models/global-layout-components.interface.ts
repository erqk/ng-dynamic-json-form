import { Type } from '@angular/core';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { FormTitleComponent } from '../components/form-title/form-title.component';

export interface GlobalLayoutComponents {
  loading?: Type<any>;
  errorMessage?: Type<ErrorMessageComponent>;
  formTitle?: Type<FormTitleComponent>;
}
