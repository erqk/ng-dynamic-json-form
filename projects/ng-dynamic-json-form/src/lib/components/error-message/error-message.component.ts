import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ControlLayoutDirective } from '../../directives/control-layout.directive';
import { ValidatorConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { GlobalLayoutComponents } from '../../models/global-layout-components.interface';
import { GlobalLayoutTemplates } from '../../models/global-layout-templates.interface';
import { FormValidationService } from '../../services/form-validation.service';
import { GlobalVariableService } from '../../services/global-variable.service';

@Component({
  selector: 'error-message',
  standalone: true,
  imports: [CommonModule, ControlLayoutDirective],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent implements OnInit, AfterViewInit {
  private _destroyRef = inject(DestroyRef);
  private _internal_formValidationService = inject(FormValidationService);
  private _internal_globalVariableService = inject(GlobalVariableService);

  @Input() control?: AbstractControl | null = null;
  @Input() validators?: ValidatorConfig[];
  @Input() layout?: FormLayout;
  @Input() customComponent?: GlobalLayoutComponents['errorMessage'];
  @Input() customTemplate?: GlobalLayoutTemplates['errorMessage'];

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor!: ViewContainerRef;

  @HostBinding('class') hostClass = 'error-message';

  errorMessages: string[] = [];

  ngOnInit(): void {
    this._internal_formValidationService
      .getErrorMessages$(this.control, this.validators)
      .pipe(
        tap((x) => (this.errorMessages = x)),
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

    if (this._internal_globalVariableService.hideErrorMessage$.value) {
      return false;
    }

    return (controlDirty || controlTouched) && hasErrors;
  }

  private _injectComponent(): void {
    if (!this.customComponent || !this.componentAnchor) {
      return;
    }

    this.componentAnchor.clear();
    const componentRef = this.componentAnchor.createComponent(
      this.customComponent
    );

    componentRef.instance.control = this.control;
    componentRef.instance.validators = this.validators;
  }
}
