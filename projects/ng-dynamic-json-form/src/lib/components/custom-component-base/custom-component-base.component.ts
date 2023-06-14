import { Component, inject } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  skipWhile,
  startWith,
  tap,
} from 'rxjs';
import { FormControlConfig } from '../../models';
import { ErrorMessageService } from '../../services';

@Component({
  selector: 'ng-dynamic-component-base',
  template: ``,
  standalone: true,
})
export class NgDynamicJsonFormCustomComponent {
  private errorMessageService = inject(ErrorMessageService);

  public control: UntypedFormControl | null = null;
  public data: FormControlConfig | null = null;
  public viewControl?: AbstractControl;
  public errors$?: Observable<string[]>;

  ngOnInit(): void {
    this.bindControlEvent();
    this.listenToErrors();
  }

  /**Mimic the behavior of `writeValue` of Angular's ControlValueAccessor */
  readControlValue(obj: any): void {
    if (obj === undefined || obj === null || obj === '') return;
    this.viewControl?.setValue(obj);
  }

  /**Mimic the behavior of `registerOnChange` of Angular's ControlValueAccessor */
  writeControlValue(fn: any): void {
    this.viewControl?.valueChanges.subscribe(fn);
  }

  /**Mimic the behavior of `setDisabledState` of Angular's ControlValueAccessor */
  controlDisabled(isDisabled: boolean): void {
    if (isDisabled) this.viewControl?.disable({ emitEvent: false });
    else this.viewControl?.enable({ emitEvent: false });
  }

  /**Mimic the behavior of `registerOnTouched` of Angular's ControlValueAccessor */
  controlTouched(isTouched: boolean): void {}

  private bindControlEvent(): void {
    if (!this.control) return;

    let pauseValueChanges = false;
    this.writeControlValue((e: any) => {
      pauseValueChanges = true;
      this.control!.setValue(e);
    });

    this.control.valueChanges
      .pipe(
        startWith(this.control.value),
        tap((x) => {
          if (pauseValueChanges) return;
          this.readControlValue(x);
          this.controlDisabled(this.control?.disabled ?? false);
          this.controlTouched(this.control?.touched ?? false);
        })
      )
      .subscribe();
  }

  private listenToErrors(): void {
    this.errors$ = this.errorMessageService.getErrors$(
      this.control!,
      this.data?.validators || []
    );
  }
}
