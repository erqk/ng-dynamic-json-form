import { ValidatorFn } from '@angular/forms';

export type CustomValidators = {
  [key: string]: ValidatorFn | ((_: any) => ValidatorFn);
};
