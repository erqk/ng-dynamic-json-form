import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { NgDynamicJsonFormValidatorConfig } from '../../models';
import { ValidatorAndConditionTypes } from '../../enums/validator-and-condition-types.enum';

@Component({
  selector: 'error-message',
  template: ` <ng-container *ngIf="control?.touched || control?.value">
    <div class="errors-container">
      <ng-container *ngFor="let error of errors$ | async">
        <div class="error">{{ error }}</div>
      </ng-container>
    </div>
  </ng-container>`,
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  @Input() control?: AbstractControl;
  @Input() validators?: NgDynamicJsonFormValidatorConfig[];

  errors$?: Observable<string[]>;

  ngOnInit(): void {
    this.errors$ = this.control?.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(0),
      switchMap((x) => this.getErrors$())
    );
  }

  private getErrors$(): Observable<string[]> {
    return of(this.control?.errors).pipe(
      map((errors) => {
        if (!errors) return [];

        return Object.keys(errors!).reduce((acc, key) => {
          switch (key.toLocaleLowerCase()) {
            case ValidatorAndConditionTypes.REQUIRED.toLowerCase():
            case ValidatorAndConditionTypes.REQUIRED_TRUE.toLowerCase():
            case ValidatorAndConditionTypes.MIN.toLowerCase():
            case ValidatorAndConditionTypes.MAX.toLowerCase():
            case ValidatorAndConditionTypes.MIN_LENGTH.toLowerCase():
            case ValidatorAndConditionTypes.MAX_LENGTH.toLowerCase():
            case ValidatorAndConditionTypes.PATTERN.toLowerCase():
            case ValidatorAndConditionTypes.EMAIL.toLowerCase():
              const customErrorMessage = this.validators
                ?.find((x) => x.name.toLocaleLowerCase() === key)
                ?.message?.replace(/{{value}}/g, this.control?.value || '');

              acc.push(
                customErrorMessage ?? JSON.stringify({ [key]: errors![key] })
              );
              break;

            // The validator name is outside the range above, meaning this is a custom validator
            // So we extract the message from ValidatorErrors keyValue pair
            default:
              acc.push(errors![key]);
              break;
          }

          return acc;
        }, [] as string[]);
      })
    );
  }
}
