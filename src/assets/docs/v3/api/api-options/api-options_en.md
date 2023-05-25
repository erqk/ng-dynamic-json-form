## Options

If your input element need to provide a list of option to select, you can insert them into `options`. Each option consists of a `label` and a `value`.

```javascript
//...
"options": [
  {
    "label": "...",
    "value": "..."
  }
]
```

> You need to provide this if type is `radio`, `checkbox`, `dropdown`.
>
> You can set `row` or `column` to the `optionsLayout` if type is `radio` and `checkbox`.

### Binary checkbox

If `type` is `checkbox`, the defualt checkbox is multi-select checkbox. If you need binary checkbox, then provide only one option, and you can omit `value` because the value will bind to the value of the `AbstractControl`.
