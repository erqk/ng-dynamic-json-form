# NgDynamicJsonForm

Generate ReactiveForm using JSON data, with as many nested group as you wish. You can build your form from very simple to very complex, and even build it using other UI libraries!

## Features:

- Create `FormControl`, `FormGroup` and `FormArray`, either nested or not.
- Support Angular built in validators and custom validators.
- Toggle `control` status (hidden or disabled) and validators depends on other `control`'s value.
- Layout styling using CSS grid.
- Support custom component.
- Support other UI libraries.

## Getting started

### Installation

Install `ng-dynamic-json-form` from npm:

```
npm i ng-dynamic-json-form
```

Next, import `NgDynamicJsonFormModule` into your `NgModule` or `AppModule` depends on your needs.

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

Provide `jsonData` with the following format (parsed JSON string). All parameters can be optional except `formControlName`. See [here](#json-data-format).

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
    gridRow: ...,
    gridColumn: ...,
    children: [],
    formArray: {},
    customComponent: ,
    extra: {}
  }
  //...
]
```

Now you can use `ng-dynamic-json-form` and pass the data in.

```html
<!-- prettier-ignore -->
<ng-dynamic-json-form
  [jsonData]="jsonData"
  [customValidators]="customValidators"
  [customComponents]="customComponents"
  [customUIComponent]="customUIComponent"
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

#### `[jsonData]`

The form will generate instantly when `jsonData` is provided and rebuild everytime `when it is changed.

#### `[customValidators]`

If built in validators does not meet your needs, then you can pass in your own custom validators. See [validators](#param-validators) for more.

```javascript
customValidators = {
  [key: string]: ValidatorFn
};
```

#### `[customComponents]`

List of custom components to lookup when `customComponent` is specified in JSON data. The component must be type of `NgDynamicJsonFormCustomComponent`.
See [Custom component](#custom-component).

```javascript
customComponents = {
  [key: string]: Type<NgDynamicJsonFormCustomComponent>
}
```

#### `[customUIComponentList]`

To use form elements from other UI library. List of supported libraries:

| Library | Package                           |
| ------- | --------------------------------- |
| PrimeNg | `ng-dynamic-json-form/ui-primeng` |

See [Custom UI component](#custom-ui-component).

> Currently there's only one library supported. I'll add other library soon.
>
> Btw it's imposibble to cover everyone needs, you can build your own, and it's possible to mix different libraries together! [Import form pre-built package](#import-from-pre-built-package)

#### `(formGet)`

The event when the form is built. It will emit a `FormGroup` which includes all the information you need. Now you can have full control on this form and get the `status` of this form.

The form will output `errors` if any of the `control` inside this form has `errors`.

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

## <a name="json-data-format"></a> JSON data format

Quick link to: <a name="param-home"></a>

- [label](#param-label)
- [formControlName](#param-formControlName)
- [value](#param-value)
- [type](#param-type)
- [options](#param-options)
- [optionsLayout](#param-optionsLayout)
- [cssGrid](#param-css-grid)
- [customComponent](#param-customComponent)
- [extra](#param-extra)
- [children](#param-children)
- [formArray](#param-formArray)
- [validators](#param-validators)
- [conditions](#param-conditions)

### <a name="param-label"></a>[`label`](#param-home)

Label for this input `control`.

### <a name="param-formControlName"></a>[`formControlName`](#param-home)

The name for this control. Either it is `FormControl`, `FormGroup`, or `FormArray`.

### <a name="param-value"></a>[`value`](#param-home)

Default value for this `control`.

### <a name="param-type"></a>[`type`](#param-home)

Type of input element to create

```
'text' | 'textarea' | 'password' | 'number' | 'email' | 'switch'| 'radio'| 'checkbox'| 'dropdown'| 'range'
```

### <a name="param-options"></a>[`options`](#param-home)

```json
//...
"options": [
  {
    "label": "...",
    "value": "..."
  }
]
```

A list of data for input elements that needs options. For example `dropdown`, `checkbox`, `radio` and so on, even your custom component.

### <a name="param-optionsLayout"></a>[`optionsLayout`](#param-home)

```
"row" | "column"
```

Specify how checkbox buttons or radio buttons are laid out.

### <a name="param-css-grid"></a>[`cssGrid`](#param-home)

The form generated is using [CSS Grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout). You can set the attributes in the following way:

```json
{
  //...
  "cssGrid": {
    "gridTemplateColumns": "...",
    "gridColumn": "...",
    "gridRow": "..."
  }
}
```

- `gridTemplateColumn`  
  Set the `grid-template-columns` for this element, to specify how children elements will be placed. Refer [grid-template-columns](#https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns).

- `gridColumn`  
  Determine how many spaces will be taken horizontally by this element. Refer [grid-column](#https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column).

- `gridRow`  
   Determine how many spaces will be taken vertically, and also the visual ordering of element. Refer [grid-row](#https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row).

### <a name="param-customComponent"></a>[`customComponent`](#param-home)

Use custom component for this `control`. Pass in the `key` of that custom component defined in `customComponents` object.

### <a name="param-extra"></a>[`extra`](#param-home)

Extra information to configure input element.

Example:

```html
<!-- prettier-ignore -->
<ng-container *ngIf="control && data">
  <textarea pInputTextarea
    [rows]="data.extra?.['rows'] || 5"
    [cols]="data.extra?.['cols'] || 30"
    [formControl]="control"
    [autoResize]="data.extra?.['autoResize'] === true"
  ></textarea>
</ng-container>
```

### <a name="param-children"></a>[`children`](#param-home)

Make this `control` as a `FormGroup`. Use the same parameters of JSON data.

### <a name="param-formArray"></a>[`formArray`](#param-home)

Make this `control` as a `FormArray`.

```json
{
  // ...
  "formControlName": "...",
  "value": [],
  "formArray": {
    "length": "...",
    "templateLabel": "...",
    "template": [],
    "editable": "...",
    "minLength": "...",
    "maxLength": "..."
  }
}
```

- **`length`**  
  The initial number of `FormGroup` to generate in this `FormArray`. If `value` is provided, the length of `value` will be used.

- **`templateLabel`**  
  Label for each of the `FormGroup` inside this `FormArray`. The label will be followed by a number to indicate current `FormGroup`'s position.

- **`template`**  
  Data to tell how to construct each `FormGroup` of this `FormArray`. It takes the exact same parameter of JSON data.<br>

  If you need to add `conditions`, the field `control` (path of the target control) is only take care about `formControlName` inside this `template`.

  ```json
  {
    //...
    "formControlName": "parentControl",
    "formArray": {
      //...
      "template": [
        {
          "label": "Name",
          "formControlName": "name"
        },
        {
          "label": "Email",
          "formControlName": "Email",
          "conditions": [
            {
              "control": "name" // ==> use "name", not "parentControl.name"
              //...
            }
          ]
        }
      ]
    }
  }
  ```

- **`editable` (optional)**  
  Allow user to add or remove `FormGroup` of this `FormArray`.

- **`minLength` (optional)**  
  Minimum length of this `FormArray` is allowed.

- **`maxLength` (optional)**  
  Maximum length of this `FormArray` is allowed.

### <a name="param-validators"></a>[`validators`](#param-home)

A list of validators to add to this `control`.

```json
//...
"validators": [
  {
    "name": "...",
    "value": "...",
    "message": "..."
  }
]
```

| name         | description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| required     | `Validators.required`                                                    |
| requiredTrue | `Validators.requiredTrue`                                                |
| min          | `Validators.min(value)`                                                  |
| max          | `Validators.max(value)`                                                  |
| minLength    | `Validators.minLength(value)`                                            |
| maxLength    | `Validators.maxLength(value)`                                            |
| pattern      | `Validators.pattern(value)`                                              |
| email        | Custom validator using pattern `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/` |
| custom       | Use validator from `customValidators` which key is matched with `value`  |

- **`name`**  
  See the table above.

- **`value` (optional)**  
  For the validators that needs a value to work. See the table above.

- **`message` (optional)**  
  Custom validation message. Support template `{{value}}` to display current value of this `control`.

#### Usage

##### {{value}} template

```json
{
  "name": "pattern",
  "value": "\\d+",
  "message": "Your id: {{value}} is invalid"
}
```

```
Output: Your id: 123456 is invalid
```

##### <a name="custom-validator-example"></a> custom validator

In your component:

```javascript
customValidators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

In your template:

```HTML
<!-- prettier-ignore -->
<ng-dynamic-json-form
 ...
 [customComponents]="customComponents"
></ng-dynamic-json-form>
```

In your JSON:

```json
{
  //...
  "validators": [
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ]
}
```

### <a name="param-conditions"></a>[`conditions`](#param-home)

You can set several conditions, to toggle `hidden`, `disabled` and validators of this `control`.

```json
//...
"conditions": [
  {
    "name": "...",
    "control": "...",
    "controlValue": "...",
    "operator": "...",
    "groupOperator": "...",
    "groupWith": []
  }
]
```

| name               | description                                           |
| ------------------ | ----------------------------------------------------- |
| hidden             | Show or hide this input element.                      |
| disabled           | Set `disable()` or `enable()` to this `control`.      |
| `validator's name` | Toggle the matches validators from `validators` list. |

- **`name` (optional if nested)**  
   If the condition is nested inside `groupWith`, then the parent `name` will be used.

  If the name is validator's name, then it will find the validator in `validators` list, and toggle the target validator if condition is met.

  ```json
  //...
  "validators": [
    {
      "name": "minLength",
      "value": "10"
    }
    //...
  ],
  "conditions": [
    {
      "name": "minLength", // Will find the minLength validator from "validators"
      //...
    }
  ]
  ```

- **`control`**  
  Path to the target `control` to listen. You can get it from `formControlName`. If it's nested, join them using dot separator.

  > Path of `basicInfo` control is `"basicInfo"`.<br>
  > Path of `age` control under `basicInfo` is `"basicInfo.age"`.

- **`controlValue`**  
  Value of the target `control` to evaluate using `operator`.

- **`operator`**  
  Operator to evaluate the target `control`'s value using `controlValue`.

  ```
  "===" | "!==" | ">=" | ">" | "<=" | "<"
  ```

- **`groupOperator` (optional)**  
  Operator to evaluate all the conditions inside `groupWith` together with the current one.
  | value | description |
  |--|--|
  | && | Check every conditions of [`current`, ...`groupWith`] is met |
  | \|\| | Check some conditions of [`current`, ...`groupWith`] is met |

- **`groupWith` (optional)**  
   Nested conditions to evaluate together with the current one.

#### Example

All the fist level conditions will be evaluated as "OR". If you need "AND" operator, then use `groupWith`.

##### Simple condition

```javascript
{
  "label": "Simple condition",
  "formControlName": "simpleCondition",
  "type": "text",
  "conditions": [
    {
      "name": "required",
      "control": "basicInfo.age",
      "controlValue": 18,
      "operator": ">"
    },
    {
      "name": "required",
      "control": "basicInfo.name",
      "controlValue": "",
      "operator": "!=="
    },
    {
      "name": "hidden",
      "control": "basicInfo.email",
      "controlValue": "",
      "operator": "!=="
    }
  ]
},

//...will be evaluated as below:

// simpleCondition is required
if (basicInfo.age > 18 || basicInfo.name !== "") {
}

// simpleCondition is hidden
if (basicInfo.email !== "") {
}
```

##### Complex condition

```javascript
{
  "label": "Complex condition",
  "formControlName": "complexCondition",
  "conditions": [
    {
      "name": "required",
      "control": "basicInfo.age",
      "controlValue": 20,
      "operator": ">",
      "groupOperator": "&&",
      "groupWith": [
        {
          "control": "basicInfo.name",
          "controlValue": "Andrew",
          "operator": "==="
        },
        {
          "control": "basicInfo.status",
          "controlValue": false,
          "operator": "===",
          "groupOperator": "||",
          "groupWith": [
            {
              "control": "basicInfo.gender",
              "controlValue": "0",
              "operator": "==="
            }
          ]
        }
      ]
    }
  ]
}

//...will be evaluated as the same way as

// complexCondition is required
if (basicInfo.age > 20 && basicInfo.name === "Andrew" && (basicInfo.status === >false || basicInfo.gender === "0")) {
}
```

## <a name="custom-component"></a>Custom component

### Build

Create a new component and extends it using `NgDynamicJsonFormCustomComponent`.
This component have parameters for your custom component to work.

```javascript
//...
export class MyCustomComponent extends NgDynamicJsonFormCustomComponent {}
```

> This will extends using base component that have `control` and `data`.
>
> ```javascript
> export class NgDynamicJsonFormCustomComponent {
>   @Input() control: UntypedFormControl | null = null;
>   @Input() data: NgDynamicJsonFormControlConfig | null = null;
> }
> ```

Then you can build whatever type of input element you want.

For simple input element like multiple checkboxes, you can setup like below:

In your template:

```HTML
<p-checkbox
  [(ngModel)]="selectedItems"
  [name]="'group'"
  [value]="item.value"
  [inputId]="item.value"
  (onChange)="onChanged($event)"
></p-checkbox>
```

In your component:

```javascript
ngOnInit(): void {
  this.setValue();
}

setValue(): void {
  if (!this.control || !Array.isArray(this.control.value)) {
    return;
  }

  this.selectedItems = [...this.control.value];
}

onChanged(e: { checked: any[]; originalEvent: Event }): void {
  this.control?.setValue(e.checked);
}
```

Or, you can make component that contains a `FormGroup` inside:

```javascript
formGroup = new FormGroup({
  control1: new FormControl(""),
  control2: new FormControl(""),
  control3: new FormControl(""),
});

// Set `control` value on `formGroup` changes
this.formGroup.valueChanges
  .pipe(
    debounceTime(0),
    tap((x) => this.control?.setValue(x))
  )
  .subscribe();

// To sync your `FormGroup` with the `control`
this.control?.valueChanges
  .pipe(
    startWith(this.control.value),
    debounceTime(0),
    tap((x) => {
      // Set emitEvent to false to prevent event trigger for formGroup.valueChanges
      if (this.control?.disabled) this.formGroup.disable({ emitEvent: false });
      if (this.control?.enabled) this.formGroup.enable({ emitEvent: false });
    })
  )
  .subscribe();
```

### Usage

In your component, declare a variable to store all your custom components:

```javascript
customComponents = {
  "custom-input": MyCustomInputComponent,
};
```

Then pass it to the `ng-dynamic-json-form`:

```HTML
<ng-dynamic-json-form
  ...
  [customComponents]="customComponents"
></ng-dynamic-json-form>
```

`ng-dynamic-json-form` will find the matching component using `customComponent` in the JSON data:

```json
{
  "label": "Custom Component",
  "formControlName": "customComponent",
  "customComponent": "custom-input",
  //...
},
```

## <a name="custom-ui-component"></a>Custom UI component

### Build

It's the same to build your custom UI component as building `customComponent`. You need to create a `component` that extends `NgDynamicJsonFormCustomComponent`.

After buildling all your components for each type of input, then you put them all in one constant:

```javascript
export const MY_UI_COMPONENTS = [
  input: MyInputComponent,
  radio: MyRadioComponent,
  checkbox: MyCheckboxComponent,
  //...
];
```

> You can view the available `key` from the [`type`](#param-type). It's okay to use the key not outside the range, as long as it matches.

> The key `input` is use for the following `type`s:
>
> - text
> - number
> - password
> - email

### Usage

After you finish building all your components, plug in the constant in your component:

```javascript
myComponentList = MY_UI_COMPONENTS;
```

Then pass it to template:

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="myComponentList"
></ng-dynamic-json-form>
```

### <a name="import-from-pre-built-package"></a> Import from pre-built package

After you install package from `ng-dynamic-json-form/ui-{library}`, let's say `ng-dynamic-json-form/ui-primeng`, import `UI_PRIMENG_COMPONENTS` into your component and pass it into `ng-dynamic-json-form`.

```javascript
customUIComponentList = UI_PRIMENG_COMPONENTS;
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="customUIComponentList"
></ng-dynamic-json-form>
```

`UI_PRIMENG_COMPONENTS` is a constant, meaning that you can override it, extends it or even mix it with other library 😊

```javascript
yourList = [
  ...UI_PRIMENG_COMPONENTS,
  ...MY_UI_COMPONENTS, // extends the other input types
];
```
