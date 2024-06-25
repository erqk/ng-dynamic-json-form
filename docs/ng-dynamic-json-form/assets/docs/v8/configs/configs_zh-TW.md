# 表單設定

生成表單的設定。

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

將此控制器設為只讀，禁止寫入任何值。此控制器的元件會自動加入 `readonly` 的 class。

#### type

請參閱 [輸入類型](../../v8/input-types/input-types_zh-TW.md).

#### value

此控制器的預設值。

#### validators

請參閱 [驗證器](../../v8/validators/validators_zh-TW.md).
