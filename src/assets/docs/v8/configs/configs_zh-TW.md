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

請參閱 [Conditions](../../v8/conditions/conditions_en.md).

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

請參閱 [Layout](../../v8/layout/layout_en.md).

#### inputMask

請參閱 [Input Mask](../../v8/input-mask/input-mask_en.md).

#### options

請參閱 [Options](../../v8/options/options_en.md).

#### readonly

將此控制器設為只讀，禁止寫入任何值。此控制器的元件會自動加入 `readonly` 的 class。

#### type

請參閱 [Input Types](../../v8/input-types/input-types_en.md).

#### value

此控制器的預設值。

#### validators

請參閱 [Validators](../../v8/validators/validators_en.md).
