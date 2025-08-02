import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, timer } from 'rxjs';

export function letterStartsWithAValidator(): AsyncValidatorFn {
  return (c: AbstractControl) =>
    timer(500).pipe(
      map(() => {
        if (`${c.value}`.startsWith('A')) return null;
        return { textError: 'First letter must starts with A' };
      })
    );
}
