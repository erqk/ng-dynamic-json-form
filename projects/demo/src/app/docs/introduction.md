# NgDynamicJsonForm

Generate ReactiveForm using JSON data, with as many nested group as you wish. You can build your form from very simple to very complex, and even build it using other UI libraries!

## Features:

- Create `FormControl`, `FormGroup` and `FormArray`, either nested or not.
- Support Angular built in validators and custom validators.
- Toggle `control` status (hidden or disabled) and validators depends on other `control`'s value.
- Layout styling using CSS grid.
- Support custom component.
- Support other UI libraries.


#### `[customUIComponentList]`

To use form elements from other UI library. List of supported libraries:

| Library | Package                           |
| ------- | --------------------------------- |
| PrimeNg | `ng-dynamic-json-form/ui-primeng` |

See [Custom UI component](#custom-ui-component).


```json
{
  "basicInfo": {
    "age": {
      "min": {
        "min": 18,
        "actual": "1"
      }
    }
  }
}
```