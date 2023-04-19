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
import {
  Subject,
  combineLatest,
  debounceTime,
  merge,
  startWith,
  takeUntil,
  tap,
} from 'rxjs';
import {
  NgDynamicJsonFormControlConfig,
  NgDynamicJsonFormControlCondition,
} from '../../models';
import { NgDynamicJsonFormConditionExtracted } from '../../models/condition-extracted.model';
import { FormGeneratorService } from '../../services/form-generator.service';
import { FormStatusService } from '../../services/form-status.service';
import { NgDynamicJsonFormCustomComponent } from '../custom-component-base/custom-component-base.component';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  styles: [],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonString = '';
  @Input() customValidators: { [key: string]: ValidatorFn } = {};
  @Input() customComponents: {
    [key: string]: Type<NgDynamicJsonFormCustomComponent>;
  } = {};

  @Output() formGet = new EventEmitter();

  @HostBinding('class')
  get hostClass() {
    return 'ng-dynamic-json-form';
  }

  form?: UntypedFormGroup;
  jsonParsed: NgDynamicJsonFormControlConfig[] | null = null;
  reload = false;

  reset$ = new Subject();
  onDestroy$ = new Subject();

  constructor(
    private formGeneratorService: FormGeneratorService,
    private formStatusService: FormStatusService
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

    this.formGeneratorService.customValidators = this.customValidators;
    this.form = this.formGeneratorService.generateFormGroup(config);
    this.formGet.emit(this.form);

    this.listenFormChanges();
  }

  private listenFormChanges(): void {
    const config = this.parseJsonData();
    if (!config.length) return;

    const conditionData = this.formStatusService.extractConditions(config);

    const updateControl = (data: NgDynamicJsonFormConditionExtracted) => {
      this.formStatusService.updateControlStatus(this.form!, data);
    };

    const controlPaths = (
      input: NgDynamicJsonFormControlCondition[],
      path: string[] = []
    ): string[] => {
      return input.reduce((acc, curr) => {
        acc.push(curr.control);
        return !curr.groupWith?.length ? acc : controlPaths(curr.groupWith, acc);
      }, path);
    };

    const rootFormChanges$ = this.form!.valueChanges.pipe(
      startWith(this.form?.value),
      debounceTime(0),
      tap((x) => this.formStatusService.updateFormErrors(this.form!))
    );

    const allControlChanges$ = conditionData.map((data) => {
      const controlsToListen = controlPaths(data.conditions)
        .reduce((a, b) => {
          // prevent listening to same control multiple times
          const isDuplicates = a.some((x) => x === b);
          if (!isDuplicates) a.push(b);
          return a;
        }, [] as string[])
        .map((x) => this.form!.get(x))
        .filter((x) => !!x);

      return combineLatest(
        controlsToListen.map((x) =>
          x!.valueChanges.pipe(startWith(x?.value ?? ''))
        )
      ).pipe(tap((x) => updateControl(data)));
    });

    merge(rootFormChanges$, ...allControlChanges$)
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
