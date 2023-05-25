## Custom UI component

### Build

It's the same to build your custom UI component as building `customComponent`. You need to create a `component` that extends `NgDynamicJsonFormCustomComponent`.

After buildling all your components for each type of input, then you put them all in one constant:

```javascript
export const MY_UI_COMPONENTS: UiComponents = {
  text: MyInputComponent,
  radio: MyRadioComponent,
  checkbox: MyCheckboxComponent,
  //...
};
```

> Your can inherit `UiComponents` to easily get all the available types(keys). It's fine to use the key outside the range, as long as they match later.

### Usage

Declare a variable to put our custom component list and bind it to the template.

```javascript
myComponentList = MY_UI_COMPONENTS;
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="myComponentList"
></ng-dynamic-json-form>
```

### Import from the pre-built constant

This is the pre-built constant for each UI libraries:

| Library | Constant              | Path                              |
| :------ | :-------------------- | :-------------------------------- |
| PrimeNg | UI_PRIMENG_COMPONENTS | `ng-dynamic-json-form/ui-primeng` |

> You need to install the corresponding library in order to use the pre-built components.

Just import the constant of pre-built components and bind it.

```javascript
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

//...
customUIComponentList = UI_PRIMENG_COMPONENTS; // UI_{{library}}_COMPONENTS
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="customUIComponentList"
></ng-dynamic-json-form>
```

Since `UI_PRIMENG_COMPONENTS` is a constant, meaning that you can override it, extends it or even mix it with other library 😊

```javascript
yourList = {
  ...UI_PRIMENG_COMPONENTS,
  ...MY_UI_COMPONENTS, // extends the other input types
};
```
