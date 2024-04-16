import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ControlLayoutDirective } from '../../directives';
import { ValidatorConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../../ng-dynamic-json-form.config';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'error-message',
  standalone: true,
  imports: [CommonModule, ControlLayoutDirective],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent implements OnInit, AfterViewInit {
  private _destroyRef = inject(DestroyRef);
  private _internal_formValidationService = inject(FormValidationService);

  @Input() control?: AbstractControl | null = null;
  @Input() validators?: ValidatorConfig[];
  @Input() layout?: FormLayout;
  @Input() layoutComponents?: LayoutComponents;
  @Input() layoutTemplates?: LayoutTemplates;
  @Input() hideErrorMessage?: boolean;
  @Output() errorMessagesGet = new EventEmitter<string[]>();

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  private _componentAnchor!: ViewContainerRef;

  @HostBinding('class.error-message') hostClass = true;

  errorMessages: string[] = [];

  ngOnInit(): void {
    this._internal_formValidationService
      .getErrorMessages$(this.control, this.validators)
      .pipe(
        tap((x) => {
          this.errorMessages = x;
          this.errorMessagesGet.emit(x);
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this._injectComponent();
  }

  get showErrors(): boolean {
    const controlTouched = this.control?.touched ?? false;
    const controlDirty = this.control?.dirty ?? false;
    const hasErrors = !!this.control?.errors;

    if (this.hideErrorMessage) {
      return false;
    }

    return (controlDirty || controlTouched) && hasErrors;
  }

  private _injectComponent(): void {
    if (!this.layoutComponents?.errorMessage || !this._componentAnchor) {
      return;
    }

    this._componentAnchor.clear();
    const componentRef = this._componentAnchor.createComponent(
      this.layoutComponents.errorMessage
    );

    componentRef.instance.control = this.control;
    componentRef.instance.validators = this.validators;
  }
}
