import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  SimpleChanges,
  Type,
} from '@angular/core';
import { FormArray, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { Subject, merge, takeUntil } from 'rxjs';
import { NgDynamicJsonFormCustomComponent } from './components/custom-component-base/custom-component-base.component';
import { UiBasicComponent } from './components/ui-basic/ui-basic.component';
import { NgDynamicJsonFormControlConfig } from './models';
import { FormGeneratorService } from './services/form-generator.service';
import { FormStatusService } from './services/form-status.service';
import { FormValidatorService } from './services/form-validator.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  styles: [],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonData: NgDynamicJsonFormControlConfig[] = [];

  /**User defined custom valiators */
  @Input() customValidators: { [key: string]: ValidatorFn } = {};

  /**User defined custom components */
  @Input() customComponents: {
    [key: string]: Type<NgDynamicJsonFormCustomComponent>;
  } = {};

  /**Form control components built with other libraries */
  @Input() customUIComponent?: Type<NgDynamicJsonFormCustomComponent>;

  @Output() formGet = new EventEmitter();

  @HostBinding('class')
  get hostClass() {
    return 'ng-dynamic-json-form';
  }

  basicFormControl = UiBasicComponent;

  form?: UntypedFormGroup;
  reload = false;

  reset$ = new Subject();
  onDestroy$ = new Subject();

  constructor(
    private formGeneratorService: FormGeneratorService,
    private formStatusService: FormStatusService,
    private formValidatorService: FormValidatorService
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['jsonData']) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
    this.reset$.complete();
  }

  private buildForm(): void {
    if (!this.jsonData || !this.jsonData.length) return;

    this.reset$.next(null);

    this.formGeneratorService.setGridColumn(this.jsonData);
    this.formValidatorService.customValidators = this.customValidators;
    this.form = this.formGeneratorService.generateFormGroup(this.jsonData);
    this.formGet.emit(this.form);

    merge(
      this.formStatusService.formErrorEvent$(this.form!),
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
    template: NgDynamicJsonFormControlConfig[],
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
