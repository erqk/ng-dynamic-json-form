import { Component, inject } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { Observable, debounceTime, startWith, tap } from 'rxjs';
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
  controlTouched(isTouched: boolean): void {
  }

  private bindControlEvent(): void {
    if (!this.control) return;

    this.writeControlValue((e: any) =>
      this.control!.setValue(e, { emitEvent: false })
    );

    this.control.valueChanges
      .pipe(
        startWith(this.control.value),
        debounceTime(0),
        tap((x) => {
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
