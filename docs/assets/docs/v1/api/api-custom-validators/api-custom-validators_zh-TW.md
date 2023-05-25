## 自定義驗證器

你可以自己建立更強大的驗證器，並將它們放到一個常數內：

```javascript
/**
 * @type {{
 *  [key: string]: ValidatorFn
 * }}
 */
customValidators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

之後，將該常數綁定到 `customValidators`:

```HTML
<!-- prettier-ignore -->
<ng-dynamic-json-form
 ...
 [customValidators]="customValidators"
></ng-dynamic-json-form>
```

現在，你可以在 JSON 資料內，針對特定的 `AbstractControl` 來設定要使用的自定驗證器。`value` 需對應到剛剛建立好的常數 `key`。

```json
{
  //...
  "validators": [
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ]
}
```
