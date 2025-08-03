import { FormControlConfig } from 'ng-dynamic-json-form';

export const CONFIG_CUSTOM_COMPONENT_EN = (translation?: {
  label: string;
}): FormControlConfig => ({
  label: translation?.label ?? 'Custom Component',
  formControlName: 'customInput',
  description: `
// Ts
@Component({
    selector: 'app-custom-input',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent extends CustomControlComponent {
  override control = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl(5, [Validators.required, Validators.min(1)]),
  });
}
  
--------------------------------------------------------------------------

// HTML
<ng-container [formGroup]="control">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col">
      <label class="font-bold">name</label>
      <input type="text" class="doc-form-element" formControlName="name" />
    </div>

    <div class="flex flex-col">
      <label class="font-bold">age (min > 1)</label>
      <input type="number" class="doc-form-element" formControlName="age" />
    </div>
  </div>
</ng-container>

<div class="flex flex-col gap-3 mt-8">
  <div class="flex flex-col">
    <span class="font-semibold text-sm">hideErrorMessage</span>
    <span>{{ hideErrorMessage() ?? "undefined" }}</span>
  </div>

  <div class="flex flex-col">
    <span class="font-semibold text-sm">control.errors</span>
    <span>{{ control.errors | json }}</span>
  </div>

  <div class="flex flex-col">
    <span class="font-semibold text-sm">control.controls.name.errors</span>
    <span>{{ control.controls.name.errors | json }}</span>
  </div>

  <div class="flex flex-col">
    <span class="font-semibold text-sm">control.controls.age.errors</span>
    <span>{{ control.controls.age.errors | json }}</span>
  </div>
</div>
  `,
  layout: {
    descriptionPosition: 'after',
  },
});
