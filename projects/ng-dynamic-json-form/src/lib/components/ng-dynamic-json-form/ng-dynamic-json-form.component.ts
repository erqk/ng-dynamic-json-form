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

  jsonParsed: NgDynamicJsonFormConfig | null = null;

  form?: UntypedFormGroup;
  shadowForm?: UntypedFormGroup;

  reload = false;

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['jsonString']) {
      this.buildForm(this.parseJsonData());
    }
  }

  private parseJsonData(): NgDynamicJsonFormConfig | undefined {
    if (!this.jsonString) return undefined;

    try {
      this.jsonParsed = JSON.parse(this.jsonString);
      return this.jsonParsed!;
    } catch (e) {
      throw 'JSON data invalid';
    }
  }

  private buildForm(jsonParsed?: NgDynamicJsonFormConfig): void {
    if (!jsonParsed) return;

    this.reload = true;

    this.form = new UntypedFormGroup({});
    this.shadowForm = new UntypedFormGroup({});

    if (!jsonParsed.children?.length) return;
    this.form = this.formGeneratorService.generateFormGroup(
      jsonParsed.children
    );

    this.formGet.emit(this.form);

    // Initiate form on the next tick to prevent
    // "There is no FormControl instance attached to form control element with name: XXX" error
    setTimeout(() => {
      this.reload = false;
    }, 0);
  }
}
