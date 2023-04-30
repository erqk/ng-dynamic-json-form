# Getting started

## Installation

Install `ng-dynamic-json-form` from npm:

```
npm i ng-dynamic-json-form
```

Next, import `NgDynamicJsonFormModule` into your `NgModule`.

```javascript
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';

@NgModule({
  ...,
  imports: [
    ...,
    NgDynamicJsonFormModule,
  ],
  ...
})
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
    label: 'Email',
    formControlName: 'email',
    type: 'email',
    validators: [
      {
        name: 'required'
      },
      {
        name: 'email'
      }
    ],
  }
]
```

Then, to get your generated form you bind to the `formGet` output event.

```javascript
onFormGet(e: UntypedFormGroup): void {
  this.form = e;
}

console.log(this.form?.value);
// {
//   "name": "Default Name",
//   "email": ""
// }

console.log(this.form?.status);
// INVALID
```

Access the `form.errors` to see if any of the `control` inside this form has `errors`.

```json
{
  "basicInfo": {
    "age": {
      "min": {
        "min": 18,
        "actual": "1"
      }
    }
  },
  "email": {
    "email": "Invalid email format"
  }
}
```

## Advanced usage

For more complex form, you can add your own custom validators and custom components to fit your needs. See **API** for more detail.

```javascript
/**
 * The `key` will be use to match with `value` of validator named "custom":
 * @example
 * {
 *  //...
 *  "validators": [
 *    { "name": "custom", "value": "..." }
 *  ]
 * }
 */
customValidators = {
  [key: string]: ValidatorFn
};

/**
 * The `key` will be use to match with `customComponent`:
 * @example
 * {
 *  //...
 *  "customComponent": "..."
 * }
 */
customComponents = {
  [key: string]: Type<NgDynamicJsonFormCustomComponent>
}
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

To use form elements from other UI library. You can install the pre-built packages, or build your own list of components, even to mix with different libraries together! 🎉

| Library | Package                           |
| :------- | :--------------------------------- |
| PrimeNg | `ng-dynamic-json-form/ui-primeng` |

> Currently there's only one library supported. I'll add other library soon.

See custom UI component in **API** section for more.
