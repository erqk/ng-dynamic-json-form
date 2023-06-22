import { Component, inject } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  filter,
  startWith,
  tap
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

  private pauseEvent$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this._bindControlEvent();
    this._listenToErrors();
  }

  /**Same behavior with `writeValue` from ControlValueAccessor */
  readControlValue(obj: any): void {
    if (obj === undefined || obj === null || obj === '') return;
    this.viewControl?.setValue(obj);
  }

  /**Same behavior with `registerOnChange` from ControlValueAccessor */
  registerControlChange(fn: any): void {
    this.viewControl?.valueChanges.subscribe(fn);
  }

  /**Same behavior with `setDisabledState` from ControlValueAccessor */
  controlDisabled(isDisabled: boolean): void {
    if (isDisabled) this.viewControl?.disable({ emitEvent: false });
    else this.viewControl?.enable({ emitEvent: false });
  }

  /**Same behavior with `registerOnTouched` from ControlValueAccessor */
  registerControlTouched(fn: any): void {}

  private _bindControlEvent(): void {
    if (!this.control) return;

    this.registerControlChange((e: any) => {
      this.pauseEvent$.next(true);
      this.control!.setValue(e);
      this.pauseEvent$.next(false);
    });

    this.registerControlTouched(() => {
      this.control!.markAllAsTouched();
    });

    this.control.valueChanges
      .pipe(
        startWith(this.control.value),
        filter(() => this.pauseEvent$.value === false),
        tap((x) => {
          this.readControlValue(x);
          this.controlDisabled(this.control?.disabled ?? false);
        })
      )
      .subscribe();
  }

  private _listenToErrors(): void {
    this.errors$ = this.errorMessageService.getErrors$(
      this.control!,
      this.data?.validators || []
    );
  }
}
