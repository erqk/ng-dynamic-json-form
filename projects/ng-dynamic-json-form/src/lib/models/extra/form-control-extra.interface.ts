import { FormControlExtraCheckbox } from './form-control-extra-checkbox.interface';
import { FormControlExtraDate } from './form-control-extra-date.interface';
import { FormControlExtraRadio } from './form-control-extra-radio.interface';
import { FormControlExtraRange } from './form-control-extra-range.interface';
import { FormControlExtraSwitch } from './form-control-extra-switch.interface';
import { FormControlExtraTextarea } from './form-control-extra-textarea.interface';

export interface FormControlExtra {
  checkbox?: FormControlExtraCheckbox;
  date?: FormControlExtraDate;
  radio?: FormControlExtraRadio;
  range?: FormControlExtraRange;
  switch?: FormControlExtraSwitch;
  textarea?: FormControlExtraTextarea;
  [key: string]: any;
}