# Conditions

The conditions will let user to :

- toggle control’s validators
- toggle control’s visibility
- toggle control’s disabled state
- execute custom function

The following example demonstrates the text input is hidden when the checkbox is unchecked.

<doc-form-viewer config-path="CONDITIONS_VISIBILITY.EN"></doc-form-viewer>

## Syntax

The `conditions` is build up by `NAME`, `GROUP_OPERATOR` and a tupple of `[CONTROL_PATH, OPERATOR, VALUE]`.

```ts
{
    ...
    "conditions": {
      NAME: {
        GROUP_OPERATOR: [
          [CONTROL_PATH, OPERATOR, VALUE]
        ]
      }
    }
  }
```

### NAME

The available `NAME` are listed as below.

#### Built-in validators

- `validator.required`
- `validator.requiredTrue`
- `validator.min`
- `validator.max`
- `validator.minLength`
- `validator.maxLength`
- `validator.email`
- `validator.pattern`

#### Control state

- `control.disabled`
- `control.hidden`

#### Custom validator

- `validators.` + `name`

#### Custom action

- Any string that match with the key inside `conditionsActionFuntions`.

### GROUP_OPERATOR

`&&`, `||`

This is required for every key inside `conditions`. GROUP_OPERATOR accepts tupple or nested GROUP_OPERATOR.

> Only provide `&&` or `||` at one time. If both are present, only `&&` will be chosen.

### LEFT, OPERATOR, RIGHT

The tupple `[LEFT, OPERATOR, RIGHT]` acts as the `if` statement:

```tsx
// ["controlA", "===", "foo"]
if (controlA.value === "foo") {...}

// ["controlA,prop1", "===", "foo"]
if (controlA.value.prop1 === "foo") {...}

// ["groupA.controlA", "===", "foo"]
if (groupA.controls.controlA.value === "foo") {...}

// ["bar", "!==", "controlB"]
if (controlB.value !== "bar") {...}
```

The `OPERATOR` accepts:

- `===`
- `!==`
- `>=`
- `<=`
- `>`
- `<`
- `includes`
- `notIncludes`

## Execute custom function

Provide `conditionsActionFuntions` with key and function pairs. When the condition met, the corresponding function will be executed.

<doc-tab>

<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="configs"
  [conditionsActionFuntions]="customActions"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
configs = [
  {
    ...
    "conditions": {
      "doA": {
        "&&": [...]
      },
      "doB": {
        "&&": [...]
      }
    }
  }
];

customActions = {
  doA: () => this._actionA,
  doB: () => this._actionB
}

private _actionA(): void {
  ...
}

private _actionB(): void {
  ...
}
```

</doc-code>

</doc-tab>

## Example

### Toggle visibility

<doc-form-viewer config-path="CONDITIONS_VISIBILITY.EN"></doc-form-viewer>

### Toggle validators

To toggle validators, they must exists inside `validators`.

<doc-form-viewer config-path="CONDITIONS_VALIDATOR.EN"></doc-form-viewer>

### Multiple conditions

<doc-form-viewer config-path="CONDITIONS_MULTIPLE.EN"></doc-form-viewer>
