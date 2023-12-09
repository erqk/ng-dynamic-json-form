import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ValidatorConfig } from '../../models';
import { ErrorMessageService } from '../../services/error-message.service';

@Component({
  selector: 'error-message',
  template: ` <ng-container
    *ngIf="control && control.errors && (control?.touched || control?.value)"
  >
    <!-- TODO: Reduce the nesting level, and control the display of message using css -->
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
  private _errorMessageService = inject(ErrorMessageService);

  @Input() control?: AbstractControl | null = null;
  @Input() validators?: ValidatorConfig[];

  errors$?: Observable<string[]>;

  ngOnChanges(): void {
    if (!this.control || !this.validators?.length) return;

    this.errors$ = this.control.statusChanges.pipe(
      startWith(this.control.status),
      map(() =>
        this._errorMessageService.getErrorMessages(
          this.control!,
          this.validators || []
        )
      )
    );
  }
}
