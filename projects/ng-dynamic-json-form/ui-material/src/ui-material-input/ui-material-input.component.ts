import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  ErrorMessageService,
  NgDynamicJsonFormCustomComponent,
} from 'ng-dynamic-json-form';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ui-material-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './ui-material-input.component.html',
  styles: [],
  providers: [ErrorMessageService],
})
export class UiMaterialInputComponent extends NgDynamicJsonFormCustomComponent {
  errors$?: Observable<string[]>;

  private errorMessageService = inject(ErrorMessageService);

  ngOnInit(): void {
    this.errors$ = this.control?.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(0),
      switchMap(() =>
        this.errorMessageService.getErrors$(
          this.control!,
          this.data?.validators || []
        )
      )
    );
  }
}
