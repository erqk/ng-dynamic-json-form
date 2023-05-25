## 驗證器 (validators)

設定此 `AbstractControl` 的驗證器列表

| 名稱         | 說明                                                            |
| :----------- | :-------------------------------------------------------------- |
| required     | `Validators.required`                                           |
| requiredTrue | `Validators.requiredTrue`                                       |
| min          | `Validators.min(value)`                                         |
| max          | `Validators.max(value)`                                         |
| minLength    | `Validators.minLength(value)`                                   |
| maxLength    | `Validators.maxLength(value)`                                   |
| pattern      | `Validators.pattern(value)`                                     |
| email        | 使用正則 `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/` 的自定驗證器 |
| custom       | 從 `customValidators` 內用 `value` 尋找對應的驗證器             |

```json
//...
"validators": [
  {
    "name": "...",
    "value": "...",
    "message": "..."
  }
]
```

- ### `name`

  請參閱以上表格

- ### `value` (選填)

  給需要特定值的驗證器使用。請參閱以上表格。

- ### `message` (選填)

  自定義驗證訊息。可使用 `{{value}}` 來顯示目前輸入的值。

  ```javascript
  {
  //...
  "message": "你的 id: {{value}} 格式不正確"
  }

  // Output: 你的 id: 123456 格式不正確
  ```
