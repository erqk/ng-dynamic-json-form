# Configs

The configuration to generate form.

## API

### FormControlConfig

```tsx
export interface FormControlConfig {
  formControlName: string;
  conditions?: Conditions;
  children?: FormControlConfig[];
  description?: string;
  props?: any;
  hidden?: boolean;
  label?: string;
  layout?: FormLayout;
  inputMask?: FactoryArg;
  options?: FormControlOptions;
  readonly?: boolean;
  type?: FormControlType;
  value?: any;
  validators?: ValidatorConfig[];
}
```

#### formControlName

The form control name of this control. Should be unique.

- All the spaces will be replaced by `_` automatically.
- All the `.` and `,` characters will be removed automatically.

#### conditions

See [Conditions](../../v8/conditions/conditions_en.md).

#### children

An array of `FormControlConfig`, use this to create FormGroup for this control.

#### description

Description for this input.

#### props

Use to bind properties and attributes to the target component or the input element.

#### hidden

Don't render this input in the DOM.

#### label

The label of this input.

#### layout

See [Layout](../../v8/layout/layout_en.md).

#### inputMask

See [Input Mask](../../v8/input-mask/input-mask_en.md).

#### options

See [Options](../../v8/options/options_en.md).

#### readonly

Set this control as readonly, disallow writting of value to it. A `readonly` class will be added to the host element.

#### type

See [Input Types](../../v8/input-types/input-types_en.md).

#### value

Default value of this control.

#### validators

See [Validators](../../v8/validators/validators_en.md).
