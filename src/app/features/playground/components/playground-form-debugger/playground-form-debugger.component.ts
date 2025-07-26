import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';
import { FormStatusFunctions } from 'ng-dynamic-json-form/core/models/form-status-functions.interface';
import { merge, Subject, takeUntil, tap } from 'rxjs';
import { PlaygroundEditorComponent } from '../playground-editor/playground-editor.component';

@Component({
    selector: 'app-playground-form-debugger',
    imports: [CommonModule, PlaygroundEditorComponent],
    host: {
        class: 'flex flex-col w-full h-full beauty-scrollbar affect-child',
    },
    templateUrl: './playground-form-debugger.component.html',
    styleUrls: ['./playground-form-debugger.component.scss']
})
export class PlaygroundFormDebuggerComponent implements OnChanges {
  private destroyRef = inject(DestroyRef);
  private removeListeners$ = new Subject<void>();

  @Input() control?: AbstractControl;
  @Input() form?: UntypedFormGroup;
  @Input() formInstance?: NgDynamicJsonFormComponent;
  @Input() triggerReset = false;

  controlTypes = ['FormGroup', 'CVA'];
  activeControlType = this.controlTypes[0];

  activeSections: string[] = ['value'];
  editingForm = false;
  editingFormValue: any = '';

  eventsLog: string[] = [];

  controlStates: { label: string; value: () => boolean }[] = [
    {
      label: 'dirty',
      value: () => this.activeControl?.dirty ?? false,
    },
    {
      label: 'pristine',
      value: () => this.activeControl?.pristine ?? false,
    },
    {
      label: 'touched',
      value: () => this.activeControl?.touched ?? false,
    },
  ];

  statusFunctions?: FormStatusFunctions;
  statusActions: { label: string; action: Function }[] = [
    {
      label: 'setDirty()',
      action: () => {
        this.control?.markAsDirty();
        this.statusFunctions?.setDirty();
      },
    },
    {
      label: 'setPristine()',
      action: () => {
        this.control?.markAsPristine();
        this.statusFunctions?.setPristine();
      },
    },
    {
      label: 'setTouched()',
      action: () => {
        this.control?.markAsTouched();
        this.statusFunctions?.setTouched();
      },
    },
    {
      label: 'setUntouched()',
      action: () => {
        this.control?.markAsUntouched();
        this.statusFunctions?.setUntouched();
      },
    },
  ];

  hideErrorMessageActions: { label: string; action: Function }[] = [
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

  ngOnChanges(changes: SimpleChanges): void {
    const { formInstance } = changes;

    if (formInstance) {
      this.onFormInstanceGet();
    }
  }

  setActiveInfoType(type: string): void {
    this.activeControlType = type;
  }

  setActiveSection(section: string): void {
    if (this.activeSections.includes(section)) {
      this.activeSections = this.activeSections.filter((x) => x !== section);
    } else {
      this.activeSections.push(section);
    }
  }

  toggleFormEdit(patchForm?: boolean): void {
    this.editingForm = !this.editingForm;

    if (!this.editingForm) {
      this.activeControl?.patchValue(
        patchForm ? this.editingFormValue : this.activeControl.value
      );
    }
  }

  get activeControl(): AbstractControl | undefined {
    switch (this.activeControlType) {
      case 'FormGroup':
        return this.form;

      case 'CVA':
        return this.control;
    }

    return undefined;
  }

  private onFormInstanceGet(): void {
    if (!this.formInstance) {
      return;
    }

    const { formGet, optionsLoaded, updateStatusFunctions } =
      this.formInstance ?? {};

    const formGet$ = formGet.pipe(
      tap(() => {
        this.logEvent('formGet');
        this.setHideErrorMessageValue(undefined);
      })
    );

    const optionsLoaded$ = optionsLoaded.pipe(
      tap(() => {
        this.logEvent('optionsLoaded');
      })
    );

    const updateStatusFunctions$ = updateStatusFunctions.pipe(
      tap((x) => {
        this.logEvent('updateStatusFunctions');
        this.statusFunctions = x;
      })
    );

    this.removeListeners$.next();
    merge(formGet$, updateStatusFunctions$, optionsLoaded$)
      .pipe(
        takeUntil(this.removeListeners$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private setHideErrorMessageValue(bool?: boolean): void {
    if (!this.formInstance) return;

    const prevValue = this.formInstance.hideErrorMessage;
    const change = new SimpleChange(prevValue, bool, prevValue === undefined);

    this.formInstance.ngOnChanges({ hideErrorMessage: change });
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
