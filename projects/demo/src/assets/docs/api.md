# NgDynamicJsonForm API

## JSON data keys

```javascript
jsonData: FormControlConfig[] = [
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
    customComponent: ...,
    extra: {}
  }
  //...
]
```

| key             | Description                                                  |
| :-------------- | :----------------------------------------------------------- |
| label           | Label for this input element.                                |
| formControlName | Name for this `AbstractControl`.                             |
| value           | Use as the initial value of the `AbstractControl`.           |
| type            | Type of input element to create                              |
| options         | An array with `label` and `value`,                           |
| optionsLayout   | `row` \|\| `column`. Use together with `options`             |
| cssGrid         | CSS grid options to layout form.                             |
| customComponent | Key of the target component in `customComponents` list       |
| extra           | Extra information for the input element                      |
| children        | Create this `AbstractControl` as `FormGroup`.                |
| formArray       | Create this `AbstractControl` as `FormArray`. See FormArray. |

## Types of input element

Currently there are only elements built for these `type`s. You can have value other than this, and match it with your own custom component.

```
'text' | 'textarea' | 'password' | 'number' | 'email' | 'switch'| 'radio'| 'checkbox'| 'dropdown'
```

## Options

If your input element need to provide a list of option to select, you can insert them into `options`. Each option is consist of `label` and `value`.

> You need to provide this if type is `radio`, `checkbox`, `dropdown`.

```javascript
//...
"options": [
  {
    "label": "...", //string
    "value": "..." //any
  }
]
```

## CSS Grid

The form generated is using
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" target="_blank">CSS Grid layout</a>. Provide these data to make your input field layout differently:

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

See **Styling** section to checkout some example.

- ### `gridTemplateColumns`

  See <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns" target="_blank">grid-template-columns
  </a>.

- ### `gridColumn`

  See <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column" target="_blank">grid-column
  </a>.

- ### `gridRow`

  See <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row" target="_blank">grid-row
  </a>.

## Extra

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

## FormArray

You might want to build `FormArray` for some input element. Then you can use `formArray` to tell `ng-dynamic-json-form` how to construct it.

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

- ### `templateLabel`

  Label for each of the `FormGroup` inside this `FormArray`. The label will be followed by a number to indicate current `FormGroup`'s position.

  ```javascript
  //...
  templateLabel: "User",
  //...

  // Output: User 1, User 2, ...
  ```

- ### `template`

  Data to tell how to construct each `FormGroup` of this `FormArray`. It uses interface `FormControlConfig`.

- ### `length` (optional)

  The initial number of `FormGroup` to generate in this `FormArray`. If `value` is provided, the length of `value` will be used.

- ### `editable` (optional)

  Show add and remove button for user to add or remove `FormGroup` from this `FormArray`.

- ### `minLength` (optional)

  Minimum length of this `FormArray` is allowed.

- ### `maxLength` (optional)
  Maximum length of this `FormArray` is allowed.

### Form Array conditions

If you need to add `conditions` in the `formArray`'s `template`, the starting point of the path of `control` is the current template.

```json
{
  //...
  "formControlName": "parentControl",
  "formArray": {
    //...
    "template": [
      {
        //...
        "formControlName": "name"
      },
      {
        //...
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

## Validators

A list of validators to add to this `control`.

| name         | description                                                              |
| :----------- | :----------------------------------------------------------------------- |
| required     | `Validators.required`                                                    |
| requiredTrue | `Validators.requiredTrue`                                                |
| min          | `Validators.min(value)`                                                  |
| max          | `Validators.max(value)`                                                  |
| minLength    | `Validators.minLength(value)`                                            |
| maxLength    | `Validators.maxLength(value)`                                            |
| pattern      | `Validators.pattern(value)`                                              |
| email        | Custom validator using pattern `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/` |
| custom       | Find validator from `customValidators` using `value` as the key          |

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

- ### `name`

  See the table above.

- ### `value` (optional)

  For the validators that needs a value to work. See the table above.

- ### `message` (optional)

  Custom validation message. Support template `{{value}}` to display current value of this `control`.

  ```javascript
  {
  //...
  "message": "Your id: {{value}} is invalid"
  }

  // Output: Your id: 123456 is invalid
  ```

## Custom validators

You can build your own powerful custom validators, and putting them into a constant:

```javascript
/**
 * @type {{
 *  [key: string]: ValidatorFn
 * }}
 */
customValidators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

Then, in your template, bind it to the input `customValidators`:

```HTML
<!-- prettier-ignore -->
<ng-dynamic-json-form
 ...
 [customValidators]="customValidators"
></ng-dynamic-json-form>
```

Finally, you can choose which custom validator to use by specify the `value` to match the `key` inside `customValidators` we create just now.

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

## Conditions

### What is this about?

When we're building a larger form, imagine a scenario like this:

> `A` input is hidden until `B` is filled or `C` is set to value X.

Guess what, `ng-dynamic-json-form` can do it all for you automatically, just using the JSON data you provided! 😁

### Usage

Provide your conditions like this:

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

- ### `name` (optional if nested)

  These are the condition name you can set:

  | name               | description                                           |
  | :----------------- | :---------------------------------------------------- |
  | hidden             | Show or hide this input element.                      |
  | disabled           | Set `disable()` or `enable()` to this `control`.      |
  | `validator's name` | Toggle the matches validators from `validators` list. |

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

- ### `control`

  Path to the target `control` to listen. You can get it from `formControlName`. If it's nested, join them using dot separator.

  > Path of `basicInfo` control is `"basicInfo"`.<br>
  > Path of `age` control under `basicInfo` is `"basicInfo.age"`.

- ### `controlValue`

  Value of the target `control` to evaluate using `operator`.

- ### `operator`

  Operator to evaluate the target `control`'s value using `controlValue`.

  ```
  "===" | "!==" | ">=" | ">" | "<=" | "<"
  ```

- ### `groupOperator` (optional)

  Operator to evaluate all the conditions inside `groupWith` together with the current one.
  | Group Operator | Description |
  |--|--|
  | && | Check every conditions of [`current`, ...`groupWith`] is met |
  | \|\| | Check some conditions of [`current`, ...`groupWith`] is met |

- ### `groupWith` (optional)

  Nested conditions to evaluate together with the current one.

  > All the fist level conditions will be evaluated as "OR". If you need "AND" operator, then use `groupWith`. See example below for more details.

### Example (simple condition)

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

### Example (complex condition)

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

## Custom component

### Build

To build your own custom input element, create a new component and extends it using `NgDynamicJsonFormCustomComponent`.
This component have parameters for your custom component to work.

```javascript
//...
export class MyCustomComponent extends NgDynamicJsonFormCustomComponent {}
```

> If you don't extends `NgDynamicJsonFormCustomComponent`, make sure your custom component have `@Input()`s of `control` and `data`.
>
> ```javascript
> export class NgDynamicJsonFormCustomComponent {
>   @Input() control: UntypedFormControl | null = null;
>   @Input() data: FormControlConfig | null = null;
> }
> ```

Now, you can build whatever type of input element you want!

### Custom checkbox component

For simple input element like multiple checkboxes, you can setup like below:

In your template:

```HTML
<!-- ... -->
  <ng-container *ngFor="let item of data.options">
    <div class="field-checkbox">
      <p-checkbox
        [(ngModel)]="selectedItems"
        [name]="'group'"
        [value]="item.value"
        [inputId]="item.value"
        (onChange)="onChanged($event)"
      ></p-checkbox>
      <label [for]="item.value">{{ item.label }}</label>
    </div>
  </ng-container>
<!-- ... -->
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

### Custom form group component

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
  //...
  "customComponent": "custom-input",
  //...
},
```

## Custom UI component

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

> You can view the available `key` from the `type`. It's fine to use the key outside the range, as long as they match later.

> The following `type`s will use the component set for `input`:
>
> - text
> - number
> - password
> - email

### Usage

After you finish building all your components, just declare the constant in a variable and bind it to the template.

```javascript
myComponentList = MY_UI_COMPONENTS;
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="myComponentList"
></ng-dynamic-json-form>
```

### Import from pre-built package

Install pre-built package from npm:

```
ng-dynamic-json-form/ui-{{library}}
```

Then, you can use the constant of pre-built components from the package and bind it.

```javascript
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
yourList = [
  ...UI_PRIMENG_COMPONENTS,
  ...MY_UI_COMPONENTS, // extends the other input types
];
```
