import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ErrorMessageService,
  NgDynamicJsonFormCustomComponent,
} from 'ng-dynamic-json-form';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'ui-material-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  templateUrl: './ui-material-input-mask.component.html',
  styles: [],
  providers: [ErrorMessageService, provideNgxMask()],
})
export class UiMaterialInputMaskComponent extends NgDynamicJsonFormCustomComponent {
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
