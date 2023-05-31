import { FormControlExtraLabel } from './form-control-extra-label.model';

export interface FormControlExtraCheckbox
  extends Omit<FormControlExtraLabel, 'label'> {}
