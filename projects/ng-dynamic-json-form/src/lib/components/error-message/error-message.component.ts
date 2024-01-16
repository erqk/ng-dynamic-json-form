import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { ValidatorConfig } from '../../models';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'error-message',
  template: ` <ng-container *ngFor="let error of errorMessages">
    <div>{{ error }}</div>
  </ng-container>`,
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  private readonly _internal_formValidationService = inject(
    FormValidationService
  );
  private readonly _internal_reset$ = new Subject<void>();

  @Input() control?: AbstractControl | null = null;
  @Input() validators?: ValidatorConfig[];

  @HostBinding('class.error-message') hostClass = true;

  errorMessages: string[] = [];

  ngOnInit(): void {
    this._internal_reset$.next();
    this._internal_formValidationService
      .getErrorMessages$(this.control, this.validators)
      .pipe(
        tap((x) => (this.errorMessages = x)),
        takeUntil(this._internal_reset$)
      )
      .subscribe();
  }
}
