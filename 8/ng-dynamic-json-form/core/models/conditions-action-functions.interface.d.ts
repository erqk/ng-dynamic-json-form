import { AbstractControl } from '@angular/forms';
export interface ConditionsActionFunctions {
    [key: string]: (c?: AbstractControl) => void;
}
