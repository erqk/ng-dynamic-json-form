import { FormControlExtraCheckbox } from './form-control-extra-checkbox.model';
import { FormControlExtraDate } from './form-control-extra-date.model';
import { FormControlExtraRadio } from './form-control-extra-radio.model';
import { FormControlExtraRange } from './form-control-extra-range.model';
import { FormControlExtraSwitch } from './form-control-extra-switch.model';
import { FormControlExtraTextarea } from './form-control-extra-textarea.model';

export interface FormControlExtra {
  checkbox?: FormControlExtraCheckbox;
  date?: FormControlExtraDate;
  radio?: FormControlExtraRadio;
  range?: FormControlExtraRange;
  switch?: FormControlExtraSwitch;
  textarea?: FormControlExtraTextarea;
}
