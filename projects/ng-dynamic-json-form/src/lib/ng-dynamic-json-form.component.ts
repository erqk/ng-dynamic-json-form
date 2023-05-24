import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  Type,
} from '@angular/core';
import {
  FormArray,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subject, merge, takeUntil } from 'rxjs';
import { NgDynamicJsonFormCustomComponent } from './components/custom-component-base/custom-component-base.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { GridItemWrapperComponent } from './components/grid-item-wrapper/grid-item-wrapper.component';
import { UI_BASIC_COMPONENTS } from './constants/ui-basic-components.constant';
import { FormControlConfig, UiComponents } from './models';
import { FormConfigInitService } from './services/form-config-init.service';
import { FormGeneratorService } from './services/form-generator.service';
import { FormStatusService } from './services/form-status.service';
import { FormValidatorService } from './services/form-validator.service';
import { GridLayoutService } from './services/grid-layout.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    GridItemWrapperComponent,
    ErrorMessageComponent,
  ],
  providers: [
    FormConfigInitService,
    FormGeneratorService,
    FormValidatorService,
    FormStatusService,
    GridLayoutService,
  ],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonData: FormControlConfig[] | string = [];

  /**User defined custom valiators
   *
   * The `key` will be use to match with `value` of validator named "custom":
   * @example
   * {
   *  //...
   *  "validators": [
   *    { "name": "custom", "value": "..." }
   *  ]
   * }
   */
  @Input() customValidators: { [key: string]: ValidatorFn } = {};

  /**User defined custom components
   * The `key` will be use to match with `customComponent`:
   * @example
   * {
   *  //...
   *  "customComponent": "..."
   * }
   */
  @Input() customComponents: {
    [key: string]: Type<NgDynamicJsonFormCustomComponent>;
  } = {};

  /**Form control components built with other libraries */
  @Input() uiComponents?: UiComponents;

  @Output() formGet = new EventEmitter();

  form?: UntypedFormGroup;
  basicUIComponents = UI_BASIC_COMPONENTS;

  config: FormControlConfig[] = [];
  private reset$ = new Subject();
  private onDestroy$ = new Subject();

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private formConfigInitService: FormConfigInitService,
    private formGeneratorService: FormGeneratorService,
    private formStatusService: FormStatusService,
    private formValidatorService: FormValidatorService
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { jsonData, uiComponents } = simpleChanges;

    if (jsonData) {
      this.buildForm();
    }

    if (uiComponents) {
      this.setHostUiClass();
    }
  }

  ngOnInit(): void {
    this.initHostClass();
    this.setHostUiClass();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
    this.reset$.complete();
  }

  private initHostClass(): void {
    const hostEl = this.el.nativeElement as HTMLElement;
    const dynamicFormsFound = document.querySelectorAll('ng-dynamic-json-form');
    const hostIndex = Array.from(dynamicFormsFound).indexOf(hostEl);

    this.renderer2.addClass(hostEl, 'ng-dynamic-json-form');
    this.renderer2.addClass(hostEl, `index-${hostIndex}`);
    this.formStatusService.hostIndex = hostIndex;
  }

  private setHostUiClass(): void {
    const hostEl = this.el.nativeElement as HTMLElement;

    if (!this.uiComponents) {
      this.renderer2.addClass(hostEl, 'ui-basic');
    } else {
      this.renderer2.removeClass(hostEl, 'ui-basic');
    }
  }

  private get jsonDataValid(): boolean {
    if (!this.jsonData) return false;

    if (Array.isArray(this.jsonData)) {
      return !!this.jsonData.length;
    }

    if (typeof this.jsonData === 'string') {
      try {
        this.config = JSON.parse(this.jsonData);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }

    return false;
  }

  private buildForm(): void {
    if (!this.jsonDataValid) return;

    if (Array.isArray(this.jsonData)) {
      this.config = this.jsonData;
    }

    this.formConfigInitService.init(this.config);

    this.formValidatorService.customValidators = this.customValidators;
    this.form = this.formGeneratorService.generateFormGroup(this.config);
    this.formGet.emit(this.form);

    this.reset$.next(null);
    merge(
      this.formStatusService.formErrorEvent$(this.form),
      this.formStatusService.formControlConditonsEvent$(this.form, this.config)
    )
      .pipe(takeUntil(merge(this.reset$, this.onDestroy$)))
      .subscribe();
  }

  addFormGroup(
    formArray: FormArray,
    template: FormControlConfig[],
    index?: number
  ): void {
    const formGroup = this.formGeneratorService.generateFormGroup(template);
    if (!index) formArray.push(formGroup);
    else formArray.insert(index, formGroup);
  }

  removeFormGroup(formArray: FormArray, index?: number): void {
    formArray.removeAt(index ?? formArray.length - 1);
  }
}
