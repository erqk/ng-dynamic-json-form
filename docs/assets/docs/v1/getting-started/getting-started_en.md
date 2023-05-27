# Getting started

## Installation

Install `ng-dynamic-json-form` from npm:

```
npm i ng-dynamic-json-form
```

Next, import `NgDynamicJsonFormModule` into your `NgModule`.

```javascript
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';

...
@NgModule({
  ...
  imports: [
    NgDynamicJsonFormModule,
    ...
  ],
  ...
})
```

Lastly, add the styles into your `angular.json`:

```javascript
{
  ...
  "styles": [
    "node_modules/ng-dynamic-json-form/lib/styles/styles.scss",
    ...
  ],
  ...
}
```

## Basic usage

Provide `jsonData` that inherit interface `FormControlConfig` and bind it to the template.

> The form will generate instantly when the data is provided.

```html
<!-- prettier-ignore -->
<ng-dynamic-json-form
  [jsonData]="jsonData"
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

```javascript
jsonData: FormControlConfig[] = [
  {
    label: 'Name',
    formControlName: 'name',
    value: 'Default Name',
    type: 'text',
    validators: [
      {
        name: 'required'
      }
    ],
  },
  {
    label: 'Age',
    formControlName: 'age',
    type: 'number',
    value: 1,
    validators: [
      {
        name: 'min',
        value: 18
      }
    ],
  },
  {
    label: 'Email',
    formControlName: 'email',
    type: 'email',
    validators: [
      {
        name: 'required'
      },
      {
        name: 'email',
        message: "Invalid email format"
      }
    ],
  }
]
```

Then, to get your generated form you bind to the `formGet` output event.

```javascript
onFormGet(e: UntypedFormGroup): void {
  this.form = e;

  console.log(this.form?.value);
  // {
  //   "name": "Default Name",
  //   "email": ""
  // }

  console.log(this.form?.status);
  // INVALID
}
```

Access the `form.errors` to see if any of the `control` inside this form has `errors`.

```json
{
  "age": {
    "min": {
      "min": 18,
      "actual": "1"
    }
  },
  "email": {
    "required": true
  }
}
```

## Advanced usage

For more complex form, you can add your own custom validators and custom components to fit your needs. Also, you can setup `conditions` to bind status/validators of a `AbstractControl` to another. See **API** for more detail.

```javascript
jsonData: FormControlConfig[] = [
  {
    validators: [
      {
        name: "required"
      },
      // For custom validator, `value` is use as the key to match target ValidatorFn
      // inside the list of `customValidators`
      {
        name: "custom",
        value: "firstUppercase"
      }
    ],
    // This AbstractControl is required when AbstractControl `age` value is greater than 20
    conditions: [
      {
        name: "required",
        control: "age",
        controlValue: 20,
        operator: ">"
      }
    ],
    ...
  },
  ...
]
```

```html
<!-- prettier-ignore -->
<ng-dynamic-json-form
  [jsonData]="jsonData"
  [customValidators]="customValidators"
  [customComponents]="customComponents"
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

## UI library support

To use form elements from other UI library, you can import pre-built components or build your own list of components. Besides, it's possible to mix with different libraries! 🎉

There's pre-built UI components form libraries below:

- PrimeNg

> Currently there's only one library added. I'll add other library soon.

See **Custom UI component** in **API** section for more.
