## Form 陣列

若你需要建立 Form 陣列，則可將陣列的資訊塞入 `formArray` 欄位，以此告訴 `ng-dynamic-json-form` 怎麼構建它。

```json
{
  // ...
  "formControlName": "...",
  "value": [],
  "formArray": {
    "length": "...",
    "templateLabel": "...",
    "template": [],
    "editable": "...",
    "minLength": "...",
    "maxLength": "..."
  }
}
```

- ### `templateLabel`

  陣列內 `FormGroup` 的標題。每一個標題後面會自動加上數字，來表示這是陣列內的第幾個表單。

  ```javascript
  {
    "formArray": {
      template: {
        templateLabel: "User",
        ...
      },
      ...
    }
  }

  // Output: User 1, User 2, ...
  ```

- ### `template`

  陣列內 `FormGroup` 的模板，使用 `FormControlConfig` 型別。

- ### `length` (選填)

  預設建立的 `FormGroup` 數量。如果設定了 `value`，則使用 `value` 內的資料長度。

- ### `editable` (選填)

  是否顯示按鈕來新增、刪除 `FormGroup`。

- ### `minLength` (選填)

  `FormArray` 的最小長度。

- ### `maxLength` (選填)
  `FormArray` 的最大長度。
