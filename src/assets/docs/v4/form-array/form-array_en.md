# FormArray

## Properties

```javascript
export interface FormArrayConfig {
  template: FormControlConfig[];
  templateLabel?: string;
  length?: number;
  editable?: boolean;
  minLength?: number;
  maxLength?: number;
}
```

[Form Control Config]: ../../v4/form-control-config/form-control-config_en.md
[custom template/component]: ../../v4/styling/styling_en.md#form-array-items-header

| Property      | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| template      | See [Form Control Config].                                                   |
| templateLabel | Label for each item in the `FormArray`. Support [custom template/component]. |
| length        | Numbers of `FormGroup` to generate at start.                                 |
| editable      | Set `true` to show button for add and remove item in the `FormArray`.        |
| minLength     | Mininum length of this `FormArray`.                                          |
| maxLength     | Maximum length of this `FormArray`.                                          |

> Go to [Playground](./playground) to checkout the example.