import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostBinding,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';
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
  private _destroyRef = inject(DestroyRef);
  private _internal_formValidationService = inject(FormValidationService);

  @Input() control?: AbstractControl | null = null;
  @Input() validators?: ValidatorConfig[];

  @HostBinding('class.error-message') hostClass = true;

  errorMessages: string[] = [];

  ngOnInit(): void {
    this._internal_formValidationService
      .getErrorMessages$(this.control, this.validators)
      .pipe(
        tap((x) => (this.errorMessages = x)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
