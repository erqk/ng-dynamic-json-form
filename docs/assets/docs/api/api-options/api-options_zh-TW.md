## 選項列表 (options)

如果輸入元件需要提供用戶選項做選擇，你可以將選項塞入 `options` 內。每一個物件是由 `label` 和 `value` 組成。

```javascript
//...
"options": [
  {
    "label": "...", //string
    "value": "..." //any
  }
]
```

> 如果 `type` 是 `radio`, `checkbox`, `dropdown` 則必須提供此列表。
>
> 如果 `type` 是 `radio`, `checkbox`，你可以設定 `optionsLayout` 為 `row` 或 `column`。

### 二元複選框

如果 `type` 是 `checkbox`, 預設的複選框行為是多選。如果你需要二元複選框，則只傳入一個 `option`，可不傳 `value`，因為輸入框的值會和 `AbstractControl` 的值綁定。
