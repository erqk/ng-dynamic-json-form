# Conditions

Apply conditional rendering and conditional validators to the input. For example:

- `A` input is hidden until `B` is filled or `C` is set to value X.
- Add validator X to `A` control when `B` control's value is N.

## Properties

```javascript
{
  "coditions": {
    [name]: {
      [groupOperator]: [
        [controlPath, operator, targetValue],
        ...
        {
          [groupOperator]: [...]
        }
      ]
    }
  }
}
```

<table>
  <thead>
    <th>property</th>
    <th style="width: 35%">value</th>
    <th>description</th>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>
        <code>hidden</code>,
        <code>requied</code>,
        <code>requiredTrue</code>,
        <code>min</code>,
        <code>max</code>,
        <code>minLength</code>,
        <code>maxLength</code>,
        <code>email</code>,
        <code>pattern</code>,
        <code>...customValidatorKey</code>
      </td>
      <td>Validator or state to toggle.</td>
    </tr>
    <tr>
      <td>operator</td>
      <td>
        <code>!==</code>,
        <code>===</code>,
        <code>></code>,
        <code><</code>,
        <code>>=</code>,
        <code><=</code>
      </td>
      <td>Operator to evaluate control's value with target value.</td>
    </tr>
    <tr>
      <td>groupOperator</td>
      <td>
        <code>&&</code>,
        <code>||</code>
      </td>
      <td>Operator to use in it's children. It's no difference if it has only one child.</td>
    </tr>
    <tr>
      <td>controlPath</td>
      <td>string</td>
      <td>
        Path to the control in the form. If it's a FormArray, then the path is start from the FormGroup inside.<br><br>
        If the value is an object and need to compare the property, use <code>,</code> separator to join control path and object property path.
      </td>
    </tr>
    <tr>
      <td>targetValue</td>
      <td>any</td>
      <td>Target value to trigger condition.</td>
    </tr>
  </tbody>
</table>

## Example

### Toggle visibility

```javascript
if (toggles.checkbox === false) {
  /** Hide this control */
}
```

```json
{
  ...
  "conditions": {
    "hidden": {
      "&&": [
        ["toggles.checkbox", "===", false]
      ]
    }
  }
}
```

### Toggle disabled

```javascript
if (toggles.checkbox === false) {
  /** Disable this control */
}
```

```json
{
  ...
  "conditions": {
    "disabled": {
      "&&": [
        ["toggles.checkbox", "===", false]
      ]
    }
  }
}
```

### Toggle validators

To toggle validator, make sure the target validator is provided in `validators` array.

```javascript
if (toggles.checkbox === true || age > 20) {
  /** Add Validators.required to this control */
}

if (toggles.switch === false) {
  /** Add firstUppercase validator to this control */
}
```

```json
{
  ...
  "validators": [
    {
      "name": "required"
    },
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ],
  "conditions": {
    "required": {
      "||": [
        ["toggles.checkbox", "===", true],
        ["age", ">", 20]
      ]
    },
    "firstUppercase": {
      "&&": [
        ["toggles.switch", "===", false]
      ]
    }
  }
}
```

### Multi conditions

```javascript
if (age > 20 && name === "Andrew" && (toggles.checkbox === false || toggles.switch === false)) {
  /** Add Validators.required to this input */
}
```

```json
{
  ...
  "conditions": {
    "required": {
      "&&": [
        ["age", ">", 20],
        ["name", "===", "Andrew"],
        {
          "||": [
            ["toggles.checkbox", "===", false],
            ["toggles.switch", "===", false]
          ]
        }
      ]
    }
  }
}
```
