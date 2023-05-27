## Options

If your input element need to provide a list of option to select, you can insert them into `options`. Each option must consist of `label` and `value`.

> You need to provide this if type is `radio`, `checkbox`, `dropdown`.
>
> You can set `row` or `column` to the `optionsLayout` if type is `radio` and `checkbox`.

```javascript
{
  "options": [
    {
      "label": "...", //string
      "value": "..." //any
    }
  ],
  ...
}
```
