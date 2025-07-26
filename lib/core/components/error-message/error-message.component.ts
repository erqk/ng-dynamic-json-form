import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  Input,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ValidatorConfig } from '../../models';
import { FormValidationService } from '../../services/form-validation.service';
import { CustomErrorMessage } from '../custom-error-message/custom-error-message.abstract';

@Component({
    selector: 'error-message',
    imports: [CommonModule],
    templateUrl: './error-message.component.html',
    host: {
        class: 'error-message',
    }
})
export class ErrorMessageComponent implements AfterViewInit {
  private _internal_destroyRef = inject(DestroyRef);
  private _internal_formValidationService = inject(FormValidationService);
  private _customComponent: CustomErrorMessage | null = null;

  @Input() control?: AbstractControl;
  @Input() validators?: ValidatorConfig[];
  @Input() customComponent?: Type<CustomErrorMessage>;
  @Input() customTemplate?: TemplateRef<any>;

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor!: ViewContainerRef;

  errorMessages: string[] = [];

  ngAfterViewInit(): void {
    this._injectComponent();
    this._getErrorMessages();
  }

  private _injectComponent(): void {
    if (!this.customComponent || !this.componentAnchor) {
      return;
    }

    this.componentAnchor.clear();
    const componentRef = this.componentAnchor.createComponent(
      this.customComponent
    );

    this._customComponent = componentRef.instance;

    if (this.control) {
      componentRef.instance.control = this.control;
    }
  }

  private _getErrorMessages(): void {
    this._internal_formValidationService
      .getErrorMessages$(this.control, this.validators)
      .pipe(
        tap((x) => {
          this.errorMessages = x;

          if (this._customComponent) {
            this._customComponent.errorMessages = [...this.errorMessages];
          }
        }),
        takeUntilDestroyed(this._internal_destroyRef)
      )
      .subscribe();
  }
}
