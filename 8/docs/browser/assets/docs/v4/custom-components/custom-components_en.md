# Custom Components

## Create the component

[ControlValueAccessor]: https://angular.io/api/forms/ControlValueAccessor
[FormControlConfig]: ../../v4/form-control-config/form-control-config_en.md
[Validator]: https://angular.io/api/forms/Validator

Create a component that extends `CustomControlComponent`. It provides all the methods inside [ControlValueAccessor] and [Validator].

> It's not required to provide `NG_VALUE_ACCESSOR` and `NG_VALIDATORS`, as all the implementation happens under the hood.

### Properties

The properties that can be used to build custom component.

| Property      | Type                | Description                                                      |
| :------------ | :------------------ | :--------------------------------------------------------------- |
| control       | `AbstractControl`   | The control of this component. Must override and instantiate it. |
| data          | [FormControlConfig] | The config for this input.                                       |
| errorMessages | `string[]`          | Array of error message of this control.                          |

### Example

```javascript
export class UiBasicDateComponent extends CustomControlComponent {

  // This control can be override to FormControl, FormGroup or FormArray.
  override control = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
  });

  // Map input data
  override writeValue(obj: any): void {
    ...
    this.control.patchValue({
      date: ...,
      time: ...,
    });
  }

  // Map output data
  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(
        filter((x) => !!x.date && !!x.time),
        map(() => ...)
      )
      .subscribe(fn);
  }
}
```

## Usage

### Using component

Pass the data into `customComponents` using provider or property binding

#### Setup using provider

```javascript
{
  ...
  providers: [
    provideNgDynamicJsonForm({
      customComponents: {
        compA: CustomComponentA,
        compB: CustomComponentB,
      },
    }),
  ]
}
```

#### Setup using property binding

```javascript
import { CustomComponents } from 'ng-dynamic-json-form';

components: CustomComponents = {
  compA: CustomComponentA,
  compB: CustomComponentB,
  ...
}
```

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [customComponents]="components"
></ng-dynamic-json-form>
```

#### Config data

Set the `customComponent` to the key of the target component to use.

```json
[
  {
    ...
    "customComponent": "compA"
  },
  {
    ...
    "customComponent": "compB"
  }
]
```

### Using &lt;ng-template&gt;

Only support the input that using only `FormControl`. The template variables are same with the properties inside `CustomControlComponent`.

```html
<ng-dynamic-json-form
  [configs]="..."
  [inputTemplates]="{
    compA: compATemplate,
    compB: compBTemplate
  }"
>
  <ng-template #compATemplate let-control="control">
    ...
    <input type="text" [formControl]="control" />
  </ng-template>

  <ng-template #compBTemplate let-control="control">
    ...
    <input type="text" [formControl]="control" />
  </ng-template>
</ng-dynamic-json-form>
```

## Custom UI Components

### Pre-made UI components

Here are some components from other UI libraries that were ready to use.

[PrimeNg]: https://www.npmjs.com/package/primeng
[Angular Material]: https://www.npmjs.com/package/@angular/material

| UI library         | constant               | Path                             |
| :----------------- | :--------------------- | -------------------------------- |
| [PrimeNg]          | UI_PRIMENG_COMPONENTS  | ng-dynamic-json-form/ui-primeng  |
| [Angular Material] | UI_MATERIAL_COMPONENTS | ng-dynamic-json-form/ui-material |

> The corresponding library must get installed first.

<br>

Import them and bind it to `uiComponents` by using provider or property binding.

#### Setup using provider

```javascript
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

{
  ...,
  providers: [
    provideNgDynamicJsonForm({
      uiComponents: UI_PRIMENG_COMPONENTS
    }),
  ]
}
```

#### Setup using property binding

```javascript
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

uiComponents = UI_PRIMENG_COMPONENTS;
```

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [uiComponents]="uiComponents"
></ng-dynamic-json-form>
```

### Create custom UI components

Similar to custom components, build components that extend `CustomControlComponent`.

> Can choose to create a new UI component list, or extends the existing one.

<br>

For example, create a `HTMLEditorComponent` and set the key `htmlEditor`.

```javascript
import { UiComponents } from "ng-dynamic-json-form";
import { HTMLEditorComponent } from "src/app/features/html-editor/html-editor.component.ts";

myUiComponents: UiComponents = {
  ...UI_PRIMENG_COMPONENTS,
  htmlEditor: HTMLEditorComponent, // extends the other input types
};
```

Then, specify the `type` with the key `htmlEditor` to make this input use `HTMLEditorComponent`.

```json
{
  ...
  "type": "htmlEditor"
}
```
