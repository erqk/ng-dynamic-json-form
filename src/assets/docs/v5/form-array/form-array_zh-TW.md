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

[表單設定]: ../../v5/form-control-config/form-control-config_zh-TW.md
[自訂模板/元件]: ../../v5/styling/styling_zh-TW.md#formarray-子表單標題

| Property      | 說明                                                    |
| :------------ | :------------------------------------------------------ |
| template      | 請參閱 [表單設定]。                                     |
| templateLabel | `FormArray` 子表單的標題。 支援 [自訂模板/元件]。       |
| length        | 生成的 `FormGroup` 初始數量。                           |
| editable      | 設定 `true` 可開啟 `FormArray` 子表單的新增和刪除功能。 |
| minLength     | 設定最小子表單數量。                                    |
| maxLength     | 設定最大子表單數量。                                    |

> 可去 [玩沙場](./playground) 參考相關案例。
