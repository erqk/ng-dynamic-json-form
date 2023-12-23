# Form Control Config

```javascript
export interface FormControlConfig {
  formControlName: string;
  conditions?: FormControlCondition[];
  children?: FormControlConfig[];
  customComponent?: string;
  cssGrid?: {
    gridRow?: string,
    gridColumn?: string,
    gridTemplateColumns?: string,
  };
  description?: string;
  extra?: FormControlExtra;
  formArray?: FormArrayConfig;*/
  hideValidationMessage?: boolean;
  label?: string;
  ngxMaskConfig?: Partial<NgxMaskConfig>;
  options?: FormControlOptions[];
  optionsLayout?: "column" | "row";
  placeholder?: string;
  type?: FormControlType;
  value?: any;
  validators?: ValidatorConfig[];
}
```

| property              | description                                                               |
| :-------------------- | :------------------------------------------------------------------------ |
| formControlName       | Name for the form control. Must be unique in every `FormControlConfig[]`. |
| conditions            | [Conditions](../../v4/conditions/conditions_en.md)                        |
| children              | Provide to make this control as a FormGroup, cannot use with `formArray`. |
| customComponent       | Key of the custom component to use on this control                        |
| cssGrid               | [CssGrid](../../v4/styling/styling_en.md#css-grid)                        |
| description           | Additional text below label.                                              |
| extra                 | [Extra](../../v4/extra/extran_en.md)                                      |
| formArray             | Provide to make this control as a FormArray, cannot use with `children`.  |
| hideValidationMessage | Don't show error message when validation failed.                          |
| label                 | Label for this input.                                                     |
| ngxMaskConfig         | Parameters for `ngx-mask`. Will use text input with mask when provided.   |
| options               | [Options](../../v4/options/options_en.md)                                 |
| optionsLayout         | [OptionsLayout](../../v4/options/options_en.md#options-layout)            |
| placeholder           | Placehoder for this input.                                                |
| type                  | [Input types](#input-types)                                               |
| value                 | Initial value for this input.                                             |
| validators            | Validators to validate this input.                                        |

## Input types

Available types for the input:

- `checkbox`
- `dropdown`
- `email`
- `number`
- `password`
- `radio`
- `switch`
- `text`
- `textarea`
- ...other types

For type other than the list above, you need to pass your custom ui components into `uiComponents`. See [Custom UI Components](../../v4/custom-components/custom-components_en.md#custom-ui-components).
