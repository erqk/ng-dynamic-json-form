# Configs

## Provider config

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

export const appConfig: ApplicationConfig = {
  ...
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {...},
      uiComponents: {...},
      labelComponent: ...,
      loadingComponent: ...,
      errorComponent: ...,
      hideErrorsFor: [...],
    }),
  ]
}
```

### Properties

#### customValidators

See [Provide custom validators globally](../../v8/validators/validators_en.md#provide-custom-validators-globally)

#### uiComponents

See [UI components](../../v8/ui-components/ui-components_en.md)

#### labelComponent

See [Overwrite all the labels](../../v8/custom-label/custom-label_en.md#overwrite-all-the-labels)

#### loadingComponent

See [Overwrite all the loadings](../../v8/custom-loading/custom-loading_en.md#overwrite-all-the-loadings)

#### errorComponent

See [Overwrite all the errors](../../v8/custom-error/custom-error_en.md#overwrite-all-the-errors)

#### hideErrorsForTypes

Hide the error message section of the control where its `type` is included in the list.

```tsx
provideNgDynamicJsonForm({
  ...
  hideErrorsForTypes: ["text", "checkbox", "customTypeToHide"],
}),
```

#### showErrorsOnTouched

Show errors when the control is `touched`. Default is true.

## FormControlConfig

The configuration to generate form.

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

### Properties

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

A `readonly` class will be added to the host element. Can use to disable user to interact with this input.

#### type

See [Input Types](../../v8/input-types/input-types_en.md).

#### value

Default value of this control.

#### validators

See [Validators](../../v8/validators/validators_en.md).
