# FormControlConfig

## Properties

```javascript
export interface FormControlConfig {
  formControlName: string;
  conditions?: FormControlCondition;
  children?: FormControlConfig[];
  customComponent?: string;
  description?: string;
  extra?: any;
  formArray?: FormArrayConfig;
  label?: string;
  layout?: FormLayout;
  inputMask?: Partial<NgxMaskConfig>;
  options?: FormControlOptions;
  placeholder?: string;
  readonly?: boolean;
  type?: FormControlType;
  value?: any;
  validators?: ValidatorConfig[];
}
```

[Conditions]: ../../v4/conditions/conditions_en.md
[Extra]: ../../v4/extra/extra_en.md
[Layout]: ../../v4/styling/styling_en.md#layout
[Input mask]: ../../v4/input-mask/input-mask_en.md
[Options]: ../../v4/options/options_en.md

| property        | description                                                                    |
| :-------------- | :----------------------------------------------------------------------------- |
| formControlName | Name for the form control. Must be unique inside each `FormControlConfig[]`.   |
| conditions      | See [Conditions].                                                              |
| children        | Provide to make this control as a FormGroup, cannot use with `formArray`.      |
| customComponent | Key of the custom component to use on this control                             |
| description     | Additional text below label.                                                   |
| extra           | See [Extra].                                                                   |
| formArray       | Provide to make this control as a FormArray, cannot use with `children`.       |
| label           | Label for this input.                                                          |
| layout          | See [Layout].                                                                  |
| inputMask       | Parameters for `ngx-mask`. See [Input mask].                                   |
| options         | See [Options].                                                                 |
| placeholder     | Placehoder for this input.                                                     |
| readonly        | Set input to read only. A `readonly` class will also add to the input element. |
| type            | See [Input types](#input-types).                                               |
| value           | Initial value for this control.                                                |
| validators      | Validators to validate this control.                                           |

## Input types

Available types for the input:

- `checkbox`
- `email`
- `number`
- `password`
- `radio`
- `select`
- `switch`
- `text`
- `textarea`

For type other than the list above, create custom ui component and pass it into `uiComponents`. See [Custom UI Components](../../v4/custom-components/custom-components_en.md#custom-ui-components).

## Example

Provide the minimum properties like below, will generate a text input with no initial value.

```json
[
  {
    "formControlName": "name",
    "label": "Name",
    "type": "text"
  }
]
```

> If `type` is not specified, `text` will be used.
