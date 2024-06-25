# 輸入遮罩

此功能由 [IMask js](http://imask.js.org/) 提供。<br>
請參閱完整文件：https://imask.js.org/guide.html。

## 提供遮罩設定

提供 `inputMask` 以使用遮罩。設定格式為 JSON 時需要做一些調整，請參閱下面的 **JSON 兼容性**。

<doc-tab>

<doc-code name="JSON">

```json
{
  "formControlName": "...",
  "inputMask": {
    "mask": "^\\D+$"
  }
}
```

</doc-code>

<doc-code name="TS">

```tsx
{
	formControlName: "...",
	inputMask: {
		mask: /^\D+$/
	}
}
```

</doc-code>

</doc-tab>

> 只有 `text` 類型的欄位能使用遮罩。因此，如果提供了 `inputMask`，則 `type` 的值會被忽略並自動使用 `text`。

## JSON 兼容性

當設定為 JSON 格式時，會有一些功能無法使用。以下為 JSON 格式需要做的一些調整。

### 正則表達式

所有正則表達式需要轉為 string，並跳脫所有的 `\` 字元。

例子: `/^\d+$/` ⇒ `^\\d+$`

### Mask 的值

[Number]: https://imask.js.org/guide.html#masked-number
[Imask.MaskedRange]: https://imask.js.org/guide.html#masked-range

以下這些 `mask` 的值必須轉為文字。

| 原始值              | 轉文字              |
| :------------------ | :------------------ |
| [Number]            | “Number”            |
| [Imask.MaskedRange] | “Imask.MaskedRange” |

### 不支援的遮罩類型

- [Date Mask](https://imask.js.org/guide.html#masked-date)
- [Enum Mask](https://imask.js.org/guide.html#enum)
