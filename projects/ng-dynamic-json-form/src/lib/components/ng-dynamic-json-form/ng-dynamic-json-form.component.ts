import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  UntypedFormGroup,
  FormControl,
  UntypedFormControl,
} from '@angular/forms';
import { FormGeneratorService } from '../../services';
import { clearEmpties } from '../../utils/clear-empties';
import { NgDynamicJsonFormConfig } from '../../models';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  styles: [],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonString = '';
  @Output() formGet = new EventEmitter();

  jsonParsed: NgDynamicJsonFormConfig[] | null = null;

  form?: UntypedFormGroup;

  reload = false;

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['jsonString']) {
      this.buildForm(this.parseJsonData());
    }
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

  private buildForm(jsonParsed: NgDynamicJsonFormConfig[]): void {
    if (!jsonParsed.length) return;

    this.reload = true;

    this.form = new UntypedFormGroup({});
    this.form = this.formGeneratorService.generateFormGroup(jsonParsed);
    this.form.valueChanges.subscribe((x) => this.updateFormStatus());

    this.formGet.emit(this.form);

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

    const errors = clearEmpties(getFormErrors(this.form));
    this.form.setErrors(!Object.keys(errors).length ? null : errors);
  }
}
