# Conditions

Apply conditional rendering and conditional validators to the input.

Set the `conditions` like this:

```javascript
{
  "coditions": {
    [name]: {
      [groupOperator]: [
        [controlPath, operator, controlValue],
        ...,
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
        <code>yourCustomValidatorKey</code>
      </td>
      <td>Vadalitor or state to toggle.</td>
    </tr>
    <tr>
      <td>groupOperator</td>
      <td>
        <code>&&</code>,
        <code>||</code>
      </td>
      <td>Operator to use in it's children. It's no difference if it has only on child</td>
    </tr>
    <tr>
      <td>controlPath</td>
      <td>string</td>
      <td>
        Path to the control in the form. If it's a FormArray, then the path is start from the FormGroup inside.
      </td>
    </tr>
  </tbody>
</table>

## Example - toggle visibility

```javascript
if (basicInfo.showEmail === false) {
  // hide input
}
```

```json
{
  ...,
  "conditions": {
    "hidden": {
      "&&": [
        ["basicInfo.showEmail", "===", false]
      ]
    }
  }
}
```

## Example - toggle disabled

```javascript
if (basicInfo.showEmail === false) {
  // disable input
}
```

```json
{
  ...,
  "conditions": {
    "disabled": {
      "&&": [
        ["basicInfo.showEmail", "===", false]
      ]
    }
  }
}
```

## Exmaple - toggle validators

To toggle validator, make sure the validator is already listed in `validators` array.

```javascript
if (basicInfo.showEmail === true || basicInfo.age > 20) {
  // add Validators.required
}

if (basicInfo.gender === "0") {
  // add firstUppercase validator
}
```

```json
{
  ...,
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
        ["basicInfo.showEmail", "===", true],
        ["basicInfo.age", ">", 20]
      ]
    },
    "firstUppercase": {
      "&&": [
        ["basicInfo.gender", "===", "0"]
      ]
    }
  }
}
```

## Example - complex operation

```javascript
if (basicInfo.age > 20 && basicInfo.name === "Andrew" && (basicInfo.showEmail === false || basicInfo.gender === "0")) {
  // add Validators.required
}
```

```json
{
  ...,
  "conditions": {
    "required": {
      "&&": [
        ["basicInfo.age", ">", 20],
        ["basicInfo.name", "===", "Andrew"],
        {
          "||": [
            ["basicInfo.showEmail", "===", false],
            ["basicInfo.gender", "===", "0"]
          ]
        }
      ]
    }
  }
}
```
