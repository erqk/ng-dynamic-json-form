import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject, startWith, takeUntil, tap } from 'rxjs';
import { ValidatorConfig } from '../../models';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'error-message',
  template: ` <ng-container>
    <div class="errors-container">
      <ng-container *ngFor="let error of errorsMessages">
        <div class="error">{{ error }}</div>
      </ng-container>
    </div>
  </ng-container>`,
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  private _internal_formValidationService = inject(FormValidationService);
  private readonly _internal_reset$ = new Subject<void>();

  @Input() control?: AbstractControl | null = null;
  @Input() validators?: ValidatorConfig[];

  errorsMessages: string[] = [];

  ngOnInit(): void {
    const { control, validators = [] } = this;
    if (!control || !validators.length) return;

    this._internal_reset$.next();
    control.statusChanges
      .pipe(
        startWith(control.status),
        tap(() => {
          this.errorsMessages =
            this._internal_formValidationService.getErrorMessages(
              control.errors,
              control.value,
              validators
            );
        }),
        takeUntil(this._internal_reset$)
      )
      .subscribe();
  }
}
