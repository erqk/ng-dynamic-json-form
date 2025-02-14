import { AsyncValidatorFn } from '@angular/forms';

export type CustomAsyncValidators = {
  [key: string]: AsyncValidatorFn | ((_: any) => AsyncValidatorFn);
};
