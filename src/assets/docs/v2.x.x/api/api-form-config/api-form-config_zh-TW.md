## 表單資料設定

可以以下兩種方式提供：

1. JSON 字串
2. `FormControlConfig[]`

<div class="multi-column" style="--column-count: 2">

```javascript
// 以 JSON 方式提供
[
  // prettier-ignore
  {
    "label": "...",
    "formControlName": "...",
    "value": "...",
    "placeholder": "...",
    "description": "...",
    "type": "...",
    "ngxMaskConfig": {},
    "validators": [],
    "conditions": [],
    "options": [],
    "optionsLayout": "...",
    "cssGrid": {},
    "children": [],
    "formArray": {},
    "customComponent": "...",
    "extra": {},
  },
  ...
];
```

```javascript
// 以 `FormControlConfig[]` 提供
jsonData: FormControlConfig[] = [
  {
    label: "...",
    formControlName: "...",
    value: "...",
    placeholder: "...",
    description: "...",
    type: "...",
    ngxMaskConfig: {},
    validators: [],
    conditions: [],
    options: [],
    optionsLayout: "...",
    cssGrid: {},
    children: [],
    formArray: {},
    customComponent: "...",
    extra: {}
  },
  ...
]
```

</div>

| 欄位            | 說明                                        |
| :-------------- | :------------------------------------------ |
| label           | 欄位標題。                                  |
| formControlName | `AbstractControl` 名稱。                    |
| value           | 預設值。                                    |
| placeholder     | 輸入框的提示文字。                          |
| description     | 欄位標題下的說明文字。                      |
| type            | 輸入元件類型                                |
| ngxMaskConfig   | ngx-mask 設定                               |
| options         | 由 `label` 和 `value` 構成的陣列,           |
| optionsLayout   | `row` \|\| `column`. 和 `options` 搭配使用  |
| cssGrid         | CSS grid 屬性，用於設定表單內的版型         |
| customComponent | 用於 `customComponents` 列表的索引 `key` 值 |
| extra           | 此輸入元件的附加信息                        |
| children        | 用於製作 `FormGroup`。                      |
| formArray       | 用於製作 `FormArray`。                      |
