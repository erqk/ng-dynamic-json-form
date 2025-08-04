import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  computed,
  DestroyRef,
  effect,
  forwardRef,
  HostListener,
  inject,
  input,
  signal,
  Type,
  untracked,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import {
  combineLatest,
  EMPTY,
  filter,
  finalize,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  FormControlConfig,
  OptionItem,
  OptionSourceConfig,
} from '../../models';
import {
  FormReadyStateService,
  GlobalVariableService,
  OptionsDataService,
} from '../../services';
import { UI_BASIC_COMPONENTS } from '../../ui-basic/ui-basic-components.constant';
import { UiBasicInputComponent } from '../../ui-basic/ui-basic-input/ui-basic-input.component';
import { CustomControlComponent } from '../custom-control/custom-control.component';

@Component({
  selector: 'form-control',
  imports: [CommonModule],
  templateUrl: './form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
  ],
  styles: [':host { display: block }'],
  host: {
    class: 'form-control',
  },
})
export class FormControlComponent implements ControlValueAccessor, Validator {
  private destroyRef = inject(DestroyRef);
  private global = inject(GlobalVariableService);
  private formReadyStateService = inject(FormReadyStateService);
  private optionsDataService = inject(OptionsDataService);

  private readonly uiComponents = this.global.uiComponents;

  private inputComponentRef = signal<CustomControlComponent | undefined>(
    undefined,
  );
  private pendingValue = signal<any>(null);

  private onChange = (_: any) => {};
  private onTouched = () => {};

  readonly loadingComponent = this.global.loadingComponent ?? null;
  readonly loadingTemplate = this.global.loadingTemplate ?? null;
  readonly hostForm = this.global.rootForm;
  readonly hideErrorMessage$ = this.global.hideErrorMessage$;

  data = input<FormControlConfig>();
  control = input<AbstractControl>();
  customComponent = input<Type<CustomControlComponent>>();

  inputComponentAnchor = viewChild.required('inputComponentAnchor', {
    read: ViewContainerRef,
  });

  loading = signal<boolean>(false);

  inputType = computed(() => {
    const data = this.data();

    if (data?.inputMask) {
      return 'textMask';
    }

    // Fallback to text input if `type` is not specified.
    if (!data?.type) {
      return 'text';
    }

    switch (data.type) {
      case 'number':
      case 'text':
        return 'text';

      default:
        return data.type;
    }
  });

  inputComponent = computed(() => {
    const customComponent = this.customComponent();
    const inputType = this.inputType();
    const uiComponents = this.uiComponents;

    if (customComponent) {
      return customComponent;
    }

    if (uiComponents && uiComponents[inputType]) {
      return uiComponents[inputType];
    }

    return UI_BASIC_COMPONENTS[inputType] || UiBasicInputComponent;
  });

  customInputTemplate = computed(() => {
    const formControlName = this.data()?.formControlName;
    const templates = this.global.customTemplates;

    if (!formControlName || !templates) {
      return null;
    }

    return templates[formControlName];
  });

  optionsConfig = computed(() => structuredClone(this.data()?.options));

  dynamicOptions = toSignal(
    toObservable(this.optionsConfig).pipe(
      filter(Boolean),
      switchMap((x) => {
        const { src } = x;

        if (!src) {
          return EMPTY;
        }

        if (typeof src === 'string') {
          const source$ = this.global.optionsSources?.[src] || EMPTY;

          this.setLoading(true);

          return source$.pipe(
            // The source$ might be a hybrid Observable, which outer stream is HOT (from Subject),
            // and inner stream is COLD (http request). So we need to call setLoading(false) in both
            // `next` and `error`, instead of using finalize().
            tap({
              next: () => this.setLoading(false),
              error: () => this.setLoading(false),
            }),
          );
        }

        if (src.filter || src.trigger) {
          return this.getOptionsByFilterOrTrigger(src);
        }

        this.setLoading(true);
        return this.optionsDataService
          .getOptions$(src)
          .pipe(finalize(() => this.setLoading(false)));
      }),
    ),
  );

  useCustomLoading = computed(
    () => Boolean(this.loadingComponent) || Boolean(this.loadingTemplate),
  );

  init = effect(() => {
    const anchor = this.inputComponentAnchor();
    const useTemplate = !!this.customInputTemplate();
    const inputComponent = this.inputComponent();

    if (useTemplate || !anchor || !inputComponent) {
      return;
    }

    anchor.clear();

    untracked(() => {
      const componentRef = anchor.createComponent(inputComponent);
      this.inputComponentRef.set(componentRef.instance);
      this.initComponentInstance(componentRef);
      this.syncControlErrors();

      this.init.destroy();
    });
  });

  handleOptionsFetched = effect(() => {
    const dynamicOptions = this.dynamicOptions();
    const inputComponent = this.inputComponentRef();

    if (!dynamicOptions || !inputComponent) {
      return;
    }

    untracked(() => {
      const { autoSelectFirst, data, srcAppendPosition } =
        this.optionsConfig() ?? {};

      const pendingValue = this.pendingValue();
      const staticOptions = structuredClone(data ?? []);

      const newOptions =
        srcAppendPosition === 'before'
          ? dynamicOptions.concat(staticOptions)
          : staticOptions?.concat(dynamicOptions);

      inputComponent.onOptionsGet(newOptions);

      if (pendingValue) {
        this.writeControlValue(pendingValue);
        this.pendingValue.set(null);
      } else if (autoSelectFirst) {
        this.writeControlValue(newOptions?.[0]);
      }
    });
  });

  @HostListener('focusout', ['$event'])
  onFocusOut(): void {
    if (this.inputType() === 'select') {
      // For select component, trigger when it's blurred.
      // It should be implemented on the corresponding component.
      return;
    }

    this.onTouched();
  }

  writeValue(obj: any): void {
    this.pendingValue.set(obj);
    this.inputComponentRef()?.writeValue(obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.inputComponentRef()?.setDisabledState(isDisabled);
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.inputComponentRef()?.validate(control) ?? null;
  }

  updateControlStatus(
    status: 'dirty' | 'pristine' | 'touched' | 'untouched',
  ): void {
    const control = this.control();
    const inputComponent = this.inputComponentRef();

    switch (status) {
      case 'dirty': {
        inputComponent?.control?.markAsDirty();
        inputComponent?.markAsDirty();
        control?.markAsDirty();

        break;
      }

      case 'pristine': {
        inputComponent?.control?.markAsPristine();
        inputComponent?.markAsPristine();
        control?.markAsPristine();

        break;
      }

      case 'touched': {
        inputComponent?.control?.markAsTouched();
        inputComponent?.markAsTouched();
        control?.markAsTouched();

        break;
      }

      case 'untouched': {
        inputComponent?.control?.markAsUntouched();
        inputComponent?.markAsUntouched();
        control?.markAsUntouched();

        break;
      }
    }
  }

  private getOptionsByFilterOrTrigger(
    srcConfig: OptionSourceConfig,
  ): Observable<OptionItem[]> {
    const { filter } = srcConfig;

    const valueChangeCallback = () => {
      this.setLoading(true);

      if (!this.pendingValue()) {
        this.writeControlValue(null);
      }
    };

    const finalizeCallback = () => {
      this.setLoading(false);
    };

    if (filter) {
      return this.optionsDataService.getOptionsByFilter$({
        srcConfig,
        valueChangeCallback,
        finalizeCallback,
      });
    }

    return this.optionsDataService.getOptionsOnTrigger$({
      srcConfig,
      valueChangeCallback,
      finalizeCallback,
    });
  }

  private initComponentInstance(
    componentRef: ComponentRef<CustomControlComponent>,
  ): void {
    componentRef.instance.data.set(this.data());
    componentRef.instance.hostForm.set(this.hostForm);
    componentRef.instance.writeValue(this.pendingValue());
    componentRef.instance.registerOnChange(this.onChange);
    componentRef.instance.registerOnTouched(this.onTouched);
  }

  private setLoading(loading: boolean): void {
    this.loading.set(loading);
    this.formReadyStateService.optionsLoading(loading);
  }

  private writeControlValue(value: any): void {
    this.control()?.setValue(value);
    this.inputComponentRef()?.writeValue(value);
  }

  private syncControlErrors(): void {
    const control = this.control();
    const inputComponent = this.inputComponentRef();

    if (!control || !inputComponent) {
      console.error('No control or input component found!');
      return;
    }

    const getErrors = () => {
      const controlErrors = control.errors;
      const componentErrors = inputComponent?.control?.errors;

      if (!controlErrors && !componentErrors) {
        return null;
      }

      return controlErrors;
    };

    const setComponentErrors = (errors: ValidationErrors | null) => {
      inputComponent.control?.setErrors(errors);
      inputComponent.setErrors(errors);
    };

    const handleHideErrorsValueChange = (hide: boolean | undefined) => {
      inputComponent.hideErrorMessage.set(hide);

      if (hide === false) {
        this.updateControlStatus('dirty');
        this.updateControlStatus('touched');
      }
    };

    combineLatest([
      this.hideErrorMessage$,
      control.statusChanges.pipe(startWith(control.status)),
    ])
      .pipe(
        tap(([hideErrors]) => {
          const errors = hideErrors ? null : getErrors();

          setComponentErrors(errors);
          handleHideErrorsValueChange(hideErrors);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
