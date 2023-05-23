import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { ValidatorConfig } from '../../models';
import { ErrorMessageService } from '../../services/error-message.service';

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
  providers: [ErrorMessageService],
})
export class ErrorMessageComponent {
  @Input() control?: AbstractControl;
  @Input() validators?: ValidatorConfig[];

  errorMessageService = inject(ErrorMessageService);

  errors$?: Observable<string[]>;

  ngOnInit(): void {
    this.errors$ = this.control?.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(0),
      switchMap((x) =>
        this.errorMessageService.getErrors$(
          this.control!,
          this.validators || []
        )
      )
    );
  }
}
