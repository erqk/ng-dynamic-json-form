# Options

Use with `radio`, `checkbox`, and `dropdown` input type.

```javascript
export interface FormControlOptions {
  label: string;
  value?: any;
  labelPosition?: "before" | "after";
}
```

### Binary checkbox

Put only one option to make this checkbox binary. You can omit `value` because this will be ignored.

```json
{
  ...,
  "type": "checkbox",
  "options": [
    {
      "label": "I'm a binary checkbox"
    }
  ]
}
```

## Options Layout

Control the direction of options.

```javascript
{
  optionsLayout: "column" | "row";
}
```
