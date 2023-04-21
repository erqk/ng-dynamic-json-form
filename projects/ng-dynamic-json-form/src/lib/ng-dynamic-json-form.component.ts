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
import { NgDynamicJsonFormControlConfig } from './models';
import { FormGeneratorService } from './services/form-generator.service';
import { FormStatusService } from './services/form-status.service';
import { FormValidatorService } from './services/form-validator.service';
import { FormControlComponent } from './components/form-control/form-control.component';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  styles: [],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonString = '';
  @Input() customFormControl?: Type<NgDynamicJsonFormCustomComponent>;
  @Input() customValidators: { [key: string]: ValidatorFn } = {};
  @Input() customComponents: {
    [key: string]: Type<NgDynamicJsonFormCustomComponent>;
  } = {};

  @Output() formGet = new EventEmitter();

  @HostBinding('class')
  get hostClass() {
    return 'ng-dynamic-json-form';
  }

  basicFormControl = FormControlComponent;

  form?: UntypedFormGroup;
  jsonParsed: NgDynamicJsonFormControlConfig[] | null = null;
  reload = false;

  reset$ = new Subject();
  onDestroy$ = new Subject();

  constructor(
    private formGeneratorService: FormGeneratorService,
    private formStatusService: FormStatusService,
    private formValidatorService: FormValidatorService
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['jsonString']) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
    this.reset$.complete();
  }

  private parseJsonData(): NgDynamicJsonFormControlConfig[] {
    if (!this.jsonString) return [];

    try {
      this.jsonParsed = JSON.parse(this.jsonString);
      return this.jsonParsed!;
    } catch (e) {
      throw 'JSON data invalid';
    }
  }

  private buildForm(): void {
    const config = this.parseJsonData();
    if (!config.length) return;

    this.reset$.next(null);

    this.formValidatorService.customValidators = this.customValidators;
    this.form = this.formGeneratorService.generateFormGroup(config);
    this.formGet.emit(this.form);

    merge(
      this.formStatusService.formErrorEvent$(this.form!),
      this.formStatusService.formControlConditonsEvent$(
        this.form,
        this.parseJsonData()
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
