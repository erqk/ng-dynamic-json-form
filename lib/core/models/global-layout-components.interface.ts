import { Type } from '@angular/core';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { FormArrayItemHeaderComponent } from '../components/form-array-item-header/form-array-item-header.component';
import { FormTitleComponent } from '../components/form-title/form-title.component';

export interface GlobalLayoutComponents {
  loading?: Type<any>;
  errorMessage?: Type<ErrorMessageComponent>;
  formArrayItemHeader?: Type<FormArrayItemHeaderComponent>;
  formTitle?: Type<FormTitleComponent>;
}
