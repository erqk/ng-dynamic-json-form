# Getting Started

## Installation

Install `ng-dynamic-json-form` from npm:

```
npm i ng-dynamic-json-form
```

Next, import `NgDynamicJsonFormComponent` into your standalone component or `NgModule`.

```javascript
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';

@NgModule({
  ...,
  imports: [
    ...,
    NgDynamicJsonFormComponent,
  ],
})
```

Lastly, add the styles into your `angular.json`:

```json
{
  ...,
  "styles": [
    "node_modules/ng-dynamic-json-form/lib/styles/styles.scss",
    ...
  ],
}
```

## Setup

The inputs and outputs of `ng-dynamic-json-form` are listed as below.

| type      | name             | description                |
| :-------- | :--------------- | :------------------------- |
| @Input()  | configs          | See [Form Control Config]  |
| @Input()  | customValidators | See [Custom Validators]    |
| @Input()  | customComponents | See [Custom Components]    |
| @Input()  | uiComponents     | See [Custom UI Components] |
| @Output() | formGet          | `UntypedFormGroup`         |

[Form Control Config]: ../../v4/form-control-config/form-control-config_en.md
[Custom Validators]: ../../v4/validators/validators_en.md#custom-validators
[Custom Components]: ../../v4/custom-components/custom-components_en.md
[Custom UI Components]: ../../v4/custom-components/custom-components_en.md#custom-ui-components

`ng-dynamic-json-form` accepts two type of configs, **JSON string** or **FormControlCofig[]**.

If it's JSON string, you need to wrap your configs like this.

```json
{
  "configs": [...]
}
```

> JSON schema will be provided soon.

### Get the form

If everyting is setup correctly, an `UntypedFormGroup` is generated from your config.

You can get it's value when you submit your form, or take advantage of `valueChanges` and trigger your side effects.

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

```javascript
onFormGet(e: UntypedFormGroup): void {
  this.form = e;
}
```
