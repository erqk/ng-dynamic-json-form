# 表單設定

## Provider 設定

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

請參閱 [全域自訂驗證器](../../v8/validators/validators_zh-TW.md#全域自訂驗證器)

#### uiComponents

請參閱 [UI 元件](../../v8/ui-components/ui-components_zh-TW.md)

#### labelComponent

請參閱 [替換所有標題](../../v8/custom-label/custom-label_zh-TW.md#替換所有標題)

#### loadingComponent

請參閱 [替換所有 Loading](../../v8/custom-loading/custom-loading_zh-TW.md#替換所有-loading)

#### errorComponent

請參閱 [替換所有錯誤](../../v8/custom-error/custom-error_zh-TW.md#替換所有錯誤)

#### hideErrorsForTypes

將此列表內列出的元件 `type` 的錯誤訊息區塊隱藏。

```tsx
provideNgDynamicJsonForm({
  ...
  hideErrorsForTypes: ["text", "checkbox", "也可以使用自定義的 type"],
}),
```

## FormControlConfig

生成表單的設定。

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

此控制器的名稱，同一個表單內不可重複。

- 所有空格會被 `_` 替換。
- 所有 `.` 和 `,` 字元會被移除。

#### conditions

請參閱 [條件](../../v8/conditions/conditions_zh-TW.md).

#### children

`FormControlConfig` 的陣列，使用它來建立 FormGroup。

#### description

此欄位的描述文字。

#### props

用於綁定到此控制器元件的 properties 和 attributes。

#### hidden

不在 DOM 上渲染此欄位。

#### label

此欄位的標題。

#### layout

請參閱 [佈局](../../v8/layout/layout_zh-TW.md).

#### inputMask

請參閱 [輸入遮罩](../../v8/input-mask/input-mask_zh-TW.md).

#### options

請參閱 [選項](../../v8/options/options_zh-TW.md).

#### readonly

欄位的父層將會加入 `readonly` 的 class。可用於禁止使用者去更改此欄位的值。

#### type

請參閱 [欄位類型](../../v8/input-types/input-types_zh-TW.md).

#### value

此控制器的預設值。

#### validators

請參閱 [驗證器](../../v8/validators/validators_zh-TW.md).
