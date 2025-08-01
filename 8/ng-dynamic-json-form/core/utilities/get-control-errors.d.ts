import { AbstractControl, ValidationErrors } from '@angular/forms';
/**Get all the errors in the AbstractControl recursively
 * @example
 * root: {
 *  control1: ValidationErrors,
 *  control2: {
 *    childA: ValidationErrors
 *  }
 * }
 */
export declare function getControlErrors(control: AbstractControl | undefined): ValidationErrors | null;
