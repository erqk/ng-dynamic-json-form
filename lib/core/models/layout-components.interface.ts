import { Type } from '@angular/core';
import { CustomErrorMessage } from '../components/custom-error-message/custom-error-message.abstract';
import { FormTitleComponent } from '../components/form-title/form-title.component';

export interface LayoutComponents {
  loading?: Type<any>;
  errorMessage?: Type<CustomErrorMessage>;
  formTitle?: Type<FormTitleComponent>;
}
