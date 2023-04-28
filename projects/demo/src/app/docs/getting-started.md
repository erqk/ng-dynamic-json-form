## Getting started

### Installation

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

### Usage

Now you can use `ng-dynamic-json-form` and pass the data in.

```html
<!-- prettier-ignore -->
<ng-dynamic-json-form
  [jsonData]="jsonData"
  [customValidators]="customValidators"
  [customComponents]="customComponents"
  [customUIComponentList]="customUIComponentList"
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

### Inputs

`jsonData`

Provide your JSON data with the following key values. You can use the built in `NgDynamicJsonFormControlConfig` interface.

> The form will generate instantly when the data is provided.

```javascript
jsonData: NgDynamicJsonFormControlConfig[] = [
  {
    label: ...,
    formControlName: ...,
    value: ...,
    type: ...,
    validators: [],
    conditions: [],
    options: [],
    optionsLayout: ...,
    cssGrid: {},
    children: [],
    formArray: {},
    customComponent: ,
    extra: {}
  }
  //...
]
```

`customValidators`

A list of custom built validators. The `key` is use to match with `value` you set in `validators` of your JSON data.

```javascript
customValidators = {
  [key: string]: ValidatorFn
};
```

`customComponents`

List of custom built components. It must be type of `NgDynamicJsonFormCustomComponent`. The `key` is use to match with the `customComponent` in your JSON data.

```javascript
customComponents = {
  [key: string]: Type<NgDynamicJsonFormCustomComponent>
}
```

`customUIComponentList`

To use form elements from other UI library. List of supported libraries:

| Library | Package                           |
| ------- | --------------------------------- |
| PrimeNg | `ng-dynamic-json-form/ui-primeng` |

See [Custom UI component](#custom-ui-component).

> Currently there's only one library supported. I'll add other library soon.
>
> It's imposibble to cover everyone needs, so `ng-dynamic-json-form` give you ability to build your own, even to mix different libraries together! [Import form pre-built package](#import-from-pre-built-package)

### Events

`formGet`

The event when the form is built. It will emit a `FormGroup`, after that you can have full control on this form and get the `status` of this form.

Besides, you can access the `form.errors` to see if any of the `control` inside this form has `errors`.

```json
{
  "basicInfo": {
    "age": {
      "min": {
        "min": 18,
        "actual": "1"
      }
    }
  }
}
```
