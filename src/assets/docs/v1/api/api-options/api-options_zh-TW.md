## 選項列表 (options)

如果輸入元件需要提供用戶選項做選擇，你可以將選項塞入 `options` 內。每一個物件內必須是由 `label` 和 `value` 組成。
此陣列資料用於一些需要選項的元件，例如 `radio`, `checkbox`, `dropdown`。

> 如果 `type` 是 `radio`, `checkbox`, `dropdown` 則必須提供此列表。
>
> 如果 `type` 是 `radio`, `checkbox`，你可以設定 `optionsLayout` 為 `row` 或 `column`。

```javascript
//...
"options": [
  {
    "label": "...", //string
    "value": "..." //any
  }
]
```
