import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  outputToObservable,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import {
  FormStatusFunctions,
  NgDynamicJsonFormComponent,
} from 'ng-dynamic-json-form';
import { merge, Subject, takeUntil, tap } from 'rxjs';
import { PlaygroundEditorComponent } from '../playground-editor/playground-editor.component';

@Component({
  selector: 'app-playground-form-debugger',
  imports: [CommonModule, PlaygroundEditorComponent],
  host: {
    class: 'flex flex-col w-full h-full beauty-scrollbar affect-child',
  },
  templateUrl: './playground-form-debugger.component.html',
  styleUrls: ['./playground-form-debugger.component.scss'],
})
export class PlaygroundFormDebuggerComponent {
  private destroyRef = inject(DestroyRef);
  private removeListeners$ = new Subject<void>();

  control = input<AbstractControl>();
  form = input<UntypedFormGroup>();
  formInstance = input<NgDynamicJsonFormComponent>();

  readonly controlTypes = ['FormGroup', 'CVA'];

  readonly controlStates: { label: string; value: () => boolean }[] = [
    {
      label: 'dirty',
      value: () => this.activeControl()?.dirty ?? false,
    },
    {
      label: 'pristine',
      value: () => this.activeControl()?.pristine ?? false,
    },
    {
      label: 'touched',
      value: () => this.activeControl()?.touched ?? false,
    },
  ];

  readonly statusActions: { label: string; action: Function }[] = [
    {
      label: 'setDirty()',
      action: () => {
        this.control()?.markAsDirty();
        this.statusFunctions?.setDirty();
      },
    },
    {
      label: 'setPristine()',
      action: () => {
        this.control()?.markAsPristine();
        this.statusFunctions?.setPristine();
      },
    },
    {
      label: 'setTouched()',
      action: () => {
        this.control()?.markAsTouched();
        this.statusFunctions?.setTouched();
      },
    },
    {
      label: 'setUntouched()',
      action: () => {
        this.control()?.markAsUntouched();
        this.statusFunctions?.setUntouched();
      },
    },
  ];

  readonly hideErrorMessageActions: { label: string; action: Function }[] = [
    {
      label: 'true',
      action: () => this.setHideErrorMessageValue(true),
    },
    {
      label: 'false',
      action: () => this.setHideErrorMessageValue(false),
    },
    {
      label: 'undefined',
      action: () => this.setHideErrorMessageValue(undefined),
    },
  ];

  activeControlType = signal(this.controlTypes[0]);
  activeControl = computed(() => {
    const type = this.activeControlType();

    switch (type) {
      case 'FormGroup':
        return this.form();

      case 'CVA':
        return this.control();
    }

    return undefined;
  });

  activeSections: string[] = ['value'];
  editingFormValue: any = '';
  isFormEditing = false;

  eventsLog: string[] = [];
  statusFunctions?: FormStatusFunctions;

  onFormInstanceGet = effect(() => {
    const formInstance = this.formInstance();

    if (!formInstance) {
      return;
    }

    const { formGet, optionsLoaded, updateStatusFunctions } =
      formInstance ?? {};

    const formGet$ = outputToObservable(formGet).pipe(
      tap(() => {
        this.logEvent('formGet');
        this.setHideErrorMessageValue(undefined);
      }),
    );

    const optionsLoaded$ = outputToObservable(optionsLoaded).pipe(
      tap(() => {
        this.logEvent('optionsLoaded');
      }),
    );

    const updateStatusFunctions$ = outputToObservable(
      updateStatusFunctions,
    ).pipe(
      tap((x) => {
        this.logEvent('updateStatusFunctions');
        this.statusFunctions = x;
      }),
    );

    this.removeListeners$.next();
    merge(formGet$, updateStatusFunctions$, optionsLoaded$)
      .pipe(
        takeUntil(this.removeListeners$),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  });

  setActiveInfoType(type: string): void {
    this.activeControlType.set(type);
  }

  setActiveSection(section: string): void {
    if (this.activeSections.includes(section)) {
      this.activeSections = this.activeSections.filter((x) => x !== section);
    } else {
      this.activeSections.push(section);
    }
  }

  editValue(): void {
    this.isFormEditing = true;
  }

  confirmFormValueEdit(): void {
    const control = this.activeControl();

    control?.patchValue(this.editingFormValue);
    this.isFormEditing = false;
  }

  cancelFormValueEdit(): void {
    const control = this.activeControl();

    this.isFormEditing = false;

    // Restore the editor value to current form's value
    control?.patchValue(control.value);
  }

  handleEditorChange(value: any): void {
    this.editingFormValue = value;
  }

  private setHideErrorMessageValue(bool?: boolean): void {
    const formInstance = this.formInstance();

    if (!formInstance) {
      return;
    }

    const prevValue = formInstance.hideErrorMessage;
    formInstance.hideErrorMessage.set(bool);
  }

  private logEvent(eventName: string): void {
    const time = new Intl.DateTimeFormat('en-US', {
      timeStyle: 'medium',
    }).format(new Date());

    const removeOldThreshold = 20;
    const newEvent = `${time}: ${eventName}`;

    if (this.eventsLog.length > removeOldThreshold) {
      this.eventsLog = [
        '...',
        ...this.eventsLog.slice((removeOldThreshold - 2) * -1),
        newEvent,
      ];
    } else {
      this.eventsLog.push(newEvent);
    }
  }
}
