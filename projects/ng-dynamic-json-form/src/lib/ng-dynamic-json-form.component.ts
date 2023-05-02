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
import { FormArray, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { Subject, merge, takeUntil } from 'rxjs';
import { NgDynamicJsonFormCustomComponent } from './components/custom-component-base/custom-component-base.component';
import { UI_BASIC_COMPONENTS } from './constants/ui-basic-components.constant';
import { FormControlConfig } from './models';
import { FormGeneratorService } from './services/form-generator.service';
import { FormStatusService } from './services/form-status.service';
import { FormValidatorService } from './services/form-validator.service';
import { GridLayoutService } from './services/grid-layout.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  styles: [],
  providers: [FormStatusService],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonData: FormControlConfig[] = [];

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
  @Input() customUIComponentList?: {
    [key: string]: Type<NgDynamicJsonFormCustomComponent>;
  };

  @Output() formGet = new EventEmitter();

  basicComponentList = UI_BASIC_COMPONENTS;

  form?: UntypedFormGroup;

  private reset$ = new Subject();
  private onDestroy$ = new Subject();

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private formGeneratorService: FormGeneratorService,
    private formStatusService: FormStatusService,
    private formValidatorService: FormValidatorService,
    private gridLayoutService: GridLayoutService
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['jsonData']) {
      this.buildForm();
    }

    if (simpleChanges['customUIComponentList']) {
      this.setHostUiClass();
    }
  }

  ngOnInit(): void {
    this.initHostClass();
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

    if (!this.customUIComponentList) {
      this.renderer2.addClass(hostEl, 'ui-basic');
    } else {
      this.renderer2.removeClass(hostEl, 'ui-basic');
    }
  }

  private buildForm(): void {
    if (!this.jsonData || !this.jsonData.length) return;

    this.gridLayoutService.setGridColumn(this.jsonData);
    this.formValidatorService.customValidators = this.customValidators;
    this.form = this.formGeneratorService.generateFormGroup(this.jsonData);
    this.formGet.emit(this.form);

    this.reset$.next(null);
    merge(
      this.formStatusService.formErrorEvent$(this.form),
      this.formStatusService.formControlConditonsEvent$(
        this.form,
        this.jsonData
      )
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
