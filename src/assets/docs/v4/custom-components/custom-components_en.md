# Custom Components

You can create your own input components, collect them in an object, then bind it to the `customComponents`.

```javascript
export type CustomComponents = {
  [key: string]: Type<CustomControlComponent>,
};
```

```javascript
components: CustomComponents = {
  compA: YourComponentA,
  compB: YourComponentB,
  ...
}
```

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  [customComponents]="components"
></ng-dynamic-json-form>
```

Then, you specify the key in your config to decide which component to use.

```json
{
  ...,
  "customComponent": "compA"
}
```

## CustomControlComponent

Extends your component with `CustomControlComponent`. It provides all the methods same as `ControlValueAccessor` and `Validator`.

> It's not necessary to provide `NG_VALUE_ACCESSOR` and `NG_VALIDATORS`, as all the implementation happens under the hood.

```javascript
export class CustomControlComponent implements ControlValueAccessor, Validator {
  public data: FormControlConfig | null = null;
  public control?: any;
  public errors$?: Observable<string[]>;
}
```

| variable | description                                                   |
| :------- | :------------------------------------------------------------ |
| data     | The config for this input.                                    |
| control  | You must override this to your desire `AbstractControl`.      |
| errors$  | Subscribe to get all the error messages inside the `control`. |

## Example

```javascript
export class UiBasicDateComponent extends CustomControlComponent {

  // Override this control to any `AbstarctControl` based on your needs.
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

## Custom UI Components

Similar to custom components, build your components that extend `CustomControlComponent`, then put them inside an object and bind to `uiComponents`.

```javascript
export type UiComponents = {
  [K in FormControlType]?: Type<CustomControlComponent>;
};
```

```javascript
uiComponents: UiComponents = {
  text: textComponent,
  checkbox: checkboxComponent,
  htmlEditor: HTMLEditorComponent
  ...
};
```

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  [uiComponents]="uiComponents"
></ng-dynamic-json-form>
```

Then, you specify the key in your config to decide which component to use.

```json
{
  ...,
  "type": "htmlEditor"
}
```

## Pre-made UI components

Here are some components from other UI libraries that ready for use.

| UI library       | constant name          |
| :--------------- | :--------------------- |
| PrimeNg          | UI_PRIMENG_COMPONENTS  |
| Angular Material | UI_MATERIAL_COMPONENTS |

Import them and bind it to `uiComponents`.

```javascript
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

uiComponents = UI_PRIMENG_COMPONENTS;
```

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  [uiComponents]="uiComponents"
></ng-dynamic-json-form>
```

Since it's just an object, you can overrides or extends the content, to fufill your needs.

```javascript
yourList = {
  ...UI_PRIMENG_COMPONENTS,
  ...MY_UI_COMPONENTS, // extends the other input types
};
```
