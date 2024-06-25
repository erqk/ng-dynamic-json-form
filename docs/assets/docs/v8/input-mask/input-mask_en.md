# Input Mask

This feature is powered by [IMask js](http://imask.js.org/).<br> See the full guide https://imask.js.org/guide.html.

## Provide mask option

To use mask, provide `inputMask`. Some adjustment need to be made when the config is JSON. Checkout **JSON compatibility** below.

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

<doc-code name="TypeScript">

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

> Only `text` type is supported when using mask. Hence, the `type` value will be ignored and automatically use `text` when `inputMask` is present.

## JSON compatibility

When config is JSON, some features are not available. There are few adjustments need to be made when provide the config in JSON.

### Regex

Regex need to be pass as string literal and all `\` characters need to be escaped.

Example: `/^\d+$/` ⇒ `^\\d+$`

### Mask value

[Number]: https://imask.js.org/guide.html#masked-number
[Imask.MaskedRange]: https://imask.js.org/guide.html#masked-range

The following value of the `mask` must be stringified:

| Original            | Stringified         |
| :------------------ | :------------------ |
| [Number]            | “Number”            |
| [Imask.MaskedRange] | “Imask.MaskedRange” |

### Unsupported mask

- [Date Mask](https://imask.js.org/guide.html#masked-date)
- [Enum Mask](https://imask.js.org/guide.html#enum)
