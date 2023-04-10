import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  UntypedFormGroup
} from '@angular/forms';
import { Subject } from 'rxjs';
import { NgDynamicJsonFormConfig } from '../../models';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  styles: [],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonString = '';
  @Input() patchEvent: any = null;
  @Output() formGet = new EventEmitter();

  form?: UntypedFormGroup;
  jsonParsed: NgDynamicJsonFormConfig[] | null = null;
  reload = false;

  reset$ = new Subject();

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
    this.reset$.next(null);

    this.form = new UntypedFormGroup({});
    this.form = this.formGeneratorService.generateFormGroup(jsonParsed);
    this.formGet.emit(this.form);

    // Initiate form on the next tick to prevent
    // "There is no FormControl instance attached to form control element with name: XXX" error
    setTimeout(() => {
      this.reload = false;
    }, 0);
  }

  private setFormArray(): void {}

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
