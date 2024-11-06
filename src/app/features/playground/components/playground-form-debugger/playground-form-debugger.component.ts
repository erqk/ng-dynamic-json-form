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
import { PlaygroundFormInfoComponent } from '../playground-form-info/playground-form-info.component';

@Component({
  selector: 'app-playground-form-debugger',
  standalone: true,
  imports: [CommonModule, PlaygroundFormInfoComponent],
  templateUrl: './playground-form-debugger.component.html',
  styleUrls: ['./playground-form-debugger.component.scss'],
})
export class PlaygroundFormDebuggerComponent implements OnChanges {
  private _destroyRef = inject(DestroyRef);
  private _reset$ = new Subject<void>();

  @Input() control?: AbstractControl;
  @Input() form?: UntypedFormGroup;
  @Input() formInstance?: NgDynamicJsonFormComponent;

  statusFunctions?: FormStatusFunctions;

  debuggerTools: {
    label: string;
    children: { label: string; action: Function }[];
  }[] = [
    {
      label: 'Mark as...',
      children: [
        {
          label: 'dirty',
          action: () => this.statusFunctions?.setDirty(),
        },
        {
          label: 'pristine',
          action: () => this.statusFunctions?.setPristine(),
        },
        {
          label: 'touched',
          action: () => this.statusFunctions?.setTouched(),
        },
        {
          label: 'untouched',
          action: () => this.statusFunctions?.setUntouched(),
        },
      ],
    },
    {
      label: 'Set "hideErrorMessage":',
      children: [
        {
          label: 'true',
          action: () => this._setHideErrorMessageValue(true),
        },
        {
          label: 'false',
          action: () => this._setHideErrorMessageValue(false),
        },
        {
          label: 'undefined',
          action: () => this._setHideErrorMessageValue(undefined),
        },
      ],
    },
  ];

  infoTypes = ['FormGroup', 'CVA'];
  activeInfoType = this.infoTypes[0];
  formInfoActiveTab = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const { formInstance } = changes;

    if (formInstance) {
      this._onFormInstanceGet();
    }
  }

  setActiveInfoType(type: string): void {
    this.activeInfoType = type;
  }

  private _onFormInstanceGet(): void {
    if (!this.formInstance) {
      return;
    }

    const { optionsLoaded, updateStatusFunctions } = this.formInstance ?? {};

    const optionsLoaded$ = optionsLoaded.pipe();
    const updateStatusFunctions$ = updateStatusFunctions.pipe(
      tap((x) => (this.statusFunctions = x))
    );

    this._reset$.next();
    merge(updateStatusFunctions$, optionsLoaded$)
      .pipe(takeUntil(this._reset$), takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  private _setHideErrorMessageValue(bool?: boolean): void {
    if (!this.formInstance) return;

    const prevValue = this.formInstance.hideErrorMessage;
    const change = new SimpleChange(prevValue, bool, prevValue === undefined);

    this.formInstance.ngOnChanges({ hideErrorMessage: change });
  }
}
