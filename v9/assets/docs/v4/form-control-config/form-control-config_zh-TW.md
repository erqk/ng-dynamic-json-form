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

[條件]: ../../v4/conditions/conditions_zh-TW.md
[額外設定]: ../../v4/extra/extra_zh-TW.md
[佈局]: ../../v4/styling/styling_zh-TW.md#佈局
[輸入遮罩]: ../../v4/input-mask/input-mask_zh-TW.md
[選項]: ../../v4/options/options_zh-TW.md

| property        | description                                                 |
| :-------------- | :---------------------------------------------------------- |
| formControlName | 控制器名稱。每個 `FormControlConfig[]` 陣列內名稱不可重複。 |
| conditions      | 請參閱 [條件]。                                             |
| children        | 將此控制器變成 FormGroup, 不可與 `formArray` 一起使用。     |
| customComponent | 用於此控制器的自訂元件的 key。                              |
| description     | 描述文字。                                                  |
| extra           | 請參閱 [額外設定]。                                         |
| formArray       | 將此控制器變成 FormArray, 不可與 `children` 一起使用。      |
| label           | 此輸入元件的標題。                                          |
| layout          | 請參閱 [佈局]。                                             |
| inputMask       | `ngx-mask` 的設定。請參閱 [輸入遮罩]。                      |
| options         | 請參閱 [選項]。                                             |
| placeholder     | 輸入元件的 placeholder。                                    |
| readonly        | 設定為只讀模式。同時會加入 `readonly` class。               |
| type            | 請參閱 [輸入類型](#輸入類型).                            |
| value           | 此控制器的初始值。                                          |
| validators      | 此控制器的驗證器。                                          |

## 輸入類型

支援的輸入類型:

- `checkbox`
- `email`
- `number`
- `password`
- `radio`
- `select`
- `switch`
- `text`
- `textarea`

若需要其他類型的輸入元件，可自行建立 component 並傳入 `uiComponents`。詳情請參閱 [自訂 UI 元件](../../v4/custom-components/custom-components_zh-TW.md#自訂-ui-元件)。

## 例子

以下為非常基本的一個設定，可生成一個不帶預設值的文字輸入框。

```json
[
  {
    "formControlName": "name",
    "label": "Name",
    "type": "text"
  }
]
```

> 如果不設定 `type`，將預使用 `text`。
