import { FormControlExtraDate } from './form-control-extra-date.interface';
import { FormControlExtraRange } from './form-control-extra-range.interface';
import { FormControlExtraSwitch } from './form-control-extra-switch.interface';
import { FormControlExtraTextarea } from './form-control-extra-textarea.interface';

export interface FormControlExtra {
  date?: FormControlExtraDate;
  range?: FormControlExtraRange;
  switch?: FormControlExtraSwitch;
  textarea?: FormControlExtraTextarea;
  [key: string]: any;
}
