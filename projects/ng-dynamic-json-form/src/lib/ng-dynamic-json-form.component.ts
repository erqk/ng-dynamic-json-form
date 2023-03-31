import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgDynamicJsonFormGroupConfig } from './models/form-group-config.model';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { FormGeneratorService } from './services/form-generator.service';
import { clearEmpties } from './utils/clear-empties';

@Component({
  selector: 'ng-dynamic-json-form',
  template: `
    <ng-container *ngIf="jsonParsed && !!form && !reload">
      <form action="POST" [formGroup]="form">
        <ng-container *ngFor="let jsonItem of jsonParsed | keyvalue">
          <app-form-group
            [label]="jsonItem.key"
            [data]="jsonItem.value"
            formControlName="{{ jsonItem.key }}"
          ></app-form-group>
        </ng-container>
      </form>
    </ng-container>

    <ng-container *ngIf="!jsonString">
      Please pass in your JSON string
    </ng-container>
  `,
  styles: [],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonString = '';
  @Output() formGet = new EventEmitter();

  jsonParsed: NgDynamicJsonFormGroupConfig | null = null;

  form?: UntypedFormGroup;
  shadowForm?: UntypedFormGroup;

  reload = false;

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['jsonString']) {
      this.buildForm(this.parseJsonData());
    }
  }

  private parseJsonData(): NgDynamicJsonFormGroupConfig | undefined {
    if (!this.jsonString) return undefined;

    try {
      this.jsonParsed = JSON.parse(this.jsonString);
      return this.jsonParsed!;
    } catch (e) {
      throw 'JSON data invalid';
    }
  }

  private buildForm(jsonParsed?: NgDynamicJsonFormGroupConfig): void {
    if (!jsonParsed) return;

    this.reload = true;

    this.form = new UntypedFormGroup({});
    this.shadowForm = new UntypedFormGroup({});

    for (const key in jsonParsed) {
      const formGroup = this.formGeneratorService.generateFormGroup(
        jsonParsed[key],
        true
      );

      const formGroupShadow = this.formGeneratorService.generateFormGroup(
        jsonParsed[key]
      );

      this.form.addControl(key, new FormControl(formGroup.value));
      this.shadowForm.addControl(key, formGroupShadow);
    }

    this.form.valueChanges.subscribe((x) => this.updateFormStatus());

    // Initiate form on the next tick to prevent
    // "There is no FormControl instance attached to form control element with name: XXX" error
    setTimeout(() => {
      this.reload = false;
      this.updateFormStatus();
    }, 0);
  }

  private updateFormStatus(): void {
    if (!this.form) return;

    const getFormErrors = (input: UntypedFormControl | UntypedFormGroup) => {
      const isFormGroup = 'controls' in input;

      if (!isFormGroup) {
        return JSON.parse(JSON.stringify(input.errors));
      }

      const errors = Object.keys(input.controls).reduce((acc, key) => {
        const formControlErrors = getFormErrors(
          input.controls[key] as UntypedFormControl
        );

        if (!!formControlErrors) {
          acc = {
            ...acc,
            [key]: formControlErrors,
          };
        }

        return acc;
      }, {});

      return JSON.parse(JSON.stringify(errors));
    };

    this.shadowForm?.patchValue(this.form.getRawValue());

    if (this.shadowForm?.invalid) {
      const errors = getFormErrors(this.shadowForm);
      this.form?.setErrors(clearEmpties(errors));
    }

    this.formGet.emit(this.form);
  }
}
