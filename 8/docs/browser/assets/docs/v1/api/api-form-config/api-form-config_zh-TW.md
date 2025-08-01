## JSON 資料欄位

```javascript
jsonData: FormControlConfig[] = [
  {
    label: ...,
    formControlName: ...,
    value: ...,
    placeholder: ...,
    description: ...,
    type: ...,
    validators: [],
    conditions: [],
    options: [],
    optionsLayout: ...,
    cssGrid: {},
    children: [],
    formArray: {},
    customComponent: ...,
    extra: {}
  },
  ...
]
```

| 欄位            | 說明                                        |
| :-------------- | :------------------------------------------ |
| label           | 欄位標題。                                  |
| formControlName | `AbstractControl` 名稱。                    |
| value           | 預設值。                                    |
| placeholder     | 輸入框的提示文字。                          |
| description     | 欄位標題下的說明文字。                      |
| type            | 輸入元件類型                                |
| options         | 由 `label` 和 `value` 構成的陣列,           |
| optionsLayout   | `row` \|\| `column`. 和 `options` 搭配使用  |
| cssGrid         | CSS grid 屬性，用於設定表單內的版型         |
| customComponent | 用於 `customComponents` 列表的索引 `key` 值 |
| extra           | 此輸入元件的附加信息                        |
| children        | 用於製作 `FormGroup`。                      |
| formArray       | 用於製作 `FormArray`。                      |
