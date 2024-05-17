import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ControlLayoutDirective } from '../../directives/control-layout.directive';
import { ValidatorConfig } from '../../models';
import { LayoutComponents } from '../../models/layout-components.interface';
import { LayoutTemplates } from '../../models/layout-templates.interface';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'error-message',
  standalone: true,
  imports: [CommonModule, ControlLayoutDirective],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent implements OnChanges, AfterViewInit {
  private _internal_cd = inject(ChangeDetectorRef);
  private _internal_destroyRef = inject(DestroyRef);
  private _internal_formValidationService = inject(FormValidationService);

  @Input() control?: AbstractControl | null = null;
  @Input() touched = false;
  @Input() validators?: ValidatorConfig[];
  @Input() customComponent?: LayoutComponents['errorMessage'];
  @Input() customTemplate?: LayoutTemplates['errorMessage'];

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor!: ViewContainerRef;

  @HostBinding('class') hostClass = 'error-message';

  errorMessages: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { touched } = changes;

    if (touched && touched.currentValue) {
    }
  }

  ngAfterViewInit(): void {
    this._internal_injectComponent();
    this._internal_getErrorMessages();
  }

  private _internal_injectComponent(): void {
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

  private _internal_getErrorMessages(): void {
    this._internal_formValidationService
      .getErrorMessages$(this.control, this.validators)
      .pipe(
        tap((x) => {
          this.errorMessages = x;
          this._internal_cd.markForCheck();
        }),
        takeUntilDestroyed(this._internal_destroyRef)
      )
      .subscribe();
  }
}
