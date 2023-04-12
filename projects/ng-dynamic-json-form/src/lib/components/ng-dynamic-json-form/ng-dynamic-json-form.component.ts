import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
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
  NgDynamicJsonFormConfig,
  NgDynamicJsonFormControlCondition,
} from '../../models';
import { NgDynamicJsonFormConditionExtracted } from '../../models/condition-extracted.model';
import { FormGeneratorService } from '../../services/form-generator.service';
import { FormStatusService } from '../../services/form-status.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  styles: [],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonString = '';
  @Input() customValidators: {
    name: string;
    value: ValidatorFn;
  } | null = null;
  @Output() formGet = new EventEmitter();

  form?: UntypedFormGroup;
  jsonParsed: NgDynamicJsonFormConfig[] | null = null;
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

  private parseJsonData(): NgDynamicJsonFormConfig[] {
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

    this.reload = true;
    this.reset$.next(null);

    this.form = new UntypedFormGroup({});
    this.form = this.formGeneratorService.generateFormGroup(config);
    this.formGet.emit(this.form);

    // Initiate form on the next tick to prevent
    // "There is no FormControl instance attached to form control element with name: XXX" error
    requestAnimationFrame(() => {
      this.reload = false;
    });

    // Set listener and apply changes on next tick after form is build
    // Otherwise updateControlStatus() -> getElementById() will fail to work
    requestAnimationFrame(() => {
      this.listenFormChanges();
    });
  }

  private listenFormChanges(): void {
    const config = this.parseJsonData();
    if (!config.length) return;

    const conditionData = this.formStatusService.extractConditions(config);

    const updateControl = (data: NgDynamicJsonFormConditionExtracted) => {
      this.formStatusService.updateControlStatus(
        this.form!,
        this.form!.get(data.targetControlPath),
        data.targetControlPath,
        data.conditions
      );
    };

    const rootFormChanges$ = this.form!.valueChanges.pipe(
      startWith(this.form?.value),
      tap((x) => this.formStatusService.updateFormErrors(this.form!))
    );

    const allControlChanges$ = conditionData.map((data) => {
      const controlsToListen = data.conditions
        .reduce((a, b) => {
          const isDuplicates = a.some((x) => x.control === b.control);
          if (!isDuplicates) a.push(b);
          return a;
        }, [] as NgDynamicJsonFormControlCondition[])
        .map((x) => this.form!.get(x.control))
        .filter((x) => !!x);

      return combineLatest(
        controlsToListen.map((x) =>
          x!.valueChanges.pipe(startWith(x?.value ?? ''))
        )
      ).pipe(tap((x) => updateControl(data)));
    });

    merge(rootFormChanges$, ...allControlChanges$)
      .pipe(debounceTime(0), takeUntil(merge(this.reset$, this.onDestroy$)))
      .subscribe();
  }

  addFormGroup(
    formArray: FormArray,
    template: NgDynamicJsonFormConfig[],
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
