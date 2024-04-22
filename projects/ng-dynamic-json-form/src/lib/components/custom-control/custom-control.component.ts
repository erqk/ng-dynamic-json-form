import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, Subject, fromEvent, merge } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { FormControlConfig, OptionItem } from '../../models';
import { ControlValueService, FormValidationService } from '../../services';

@Component({
  selector: 'custom-control',
  template: ``,
  standalone: true,
})
export class CustomControlComponent implements ControlValueAccessor, Validator {
  private _internal_cd = inject(ChangeDetectorRef);
  private _internal_el = inject(ElementRef);
  private _internal_destroyRef = inject(DestroyRef);
  private _internal_controlValueService = inject(ControlValueService, {
    optional: true,
  });

  private _internal_formValidationService = inject(FormValidationService, {
    optional: true,
  });

  private _internal_hideErrors$ = new BehaviorSubject<boolean | undefined>(
    false
  );
  private _internal_init$ = new Subject<void>();

  /**Must be override by using instance of `AbstractControl`
   * @example
   * public override control = new FormControl() 'or' new UntypedFormControl();
   * public override control = new FormGroup() 'or' new UntypedFormGroup();
   * public override control = new FormArray() 'or' new UntypedFormArray();
   */
  public control?: AbstractControl;
  public data?: FormControlConfig;
  public errorMessages: string[] = [];

  public onTouched = () => {};

  writeValue(obj: any): void {
    this._internal_control.patchValue(this._internal_mapData('input', obj));
  }

  registerOnChange(fn: any): void {
    this._internal_control?.valueChanges
      .pipe(map((x) => this._internal_mapData('output', x)))
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this._internal_control?.disable()
      : this._internal_control?.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._internal_control?.errors;
  }

  onOptionsGet(data: OptionItem[]): void {
    if (!this.data || !this.data.options) {
      return;
    }

    this.data.options.data = data;
  }

  /**
   * @internal
   * Init event after component creation. Called by FormControlComponent.
   */
  private _internal_init(control?: AbstractControl): void {
    this._internal_init$.next();
    this._internal_listenErrors(control);
    this._internal_onTouchEvent();
  }

  /**@internal */
  private _internal_listenErrors(control?: AbstractControl): void {
    if (!control || !this._internal_formValidationService) return;

    const setErrors$ = merge(
      this._internal_hideErrors$,
      control.statusChanges
    ).pipe(
      tap(() => {
        const hideErrors = this._internal_hideErrors$.value;
        const errors = this._internal_control.errors ?? control.errors;

        this._internal_control.setErrors(hideErrors ? null : errors, {
          emitEvent: false,
        });
        this._internal_cd.markForCheck();
        this._internal_cd.detectChanges();
      })
    );

    setErrors$
      .pipe(
        takeUntil(this._internal_init$),
        takeUntilDestroyed(this._internal_destroyRef)
      )
      .subscribe();
  }

  /**@internal */
  private _internal_onTouchEvent(): void {
    if (this.data?.type === 'select') return;

    const host = this._internal_el.nativeElement;
    const done$ = new Subject<void>();
    const focusOut$ = fromEvent(host, 'focusout', { passive: true });

    const action = () => {
      this.onTouched();
      done$.next();
      done$.complete();
      done$.unsubscribe();
    };

    focusOut$
      .pipe(
        tap(() => action()),
        takeUntil(done$),
        takeUntilDestroyed(this._internal_destroyRef)
      )
      .subscribe();
  }

  /**@internal */
  private _internal_mapData(type: 'input' | 'output', data: unknown) {
    const service = this._internal_controlValueService;
    if (!service) return data;

    return service.mapData(type, data, this.data);
  }

  /**@internal */
  private get _internal_control(): AbstractControl {
    if (!this.control || !(this.control instanceof AbstractControl)) {
      throw {
        message: `The component extends CustomControlComponent but control is not defined`,
        component: this,
      };
    }

    return this.control;
  }
}
