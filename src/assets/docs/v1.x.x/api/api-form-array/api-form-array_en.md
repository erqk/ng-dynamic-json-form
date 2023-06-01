## FormArray

You might want to build `FormArray` for some input element. Then you can use `formArray` to tell `ng-dynamic-json-form` how to construct it.

```json
{
  // ...
  "formControlName": "...",
  "value": [],
  "formArray": {
    "length": "...",
    "templateLabel": "...",
    "template": [],
    "editable": "...",
    "minLength": "...",
    "maxLength": "..."
  }
}
```

- ### `templateLabel`

  Label for each of the `FormGroup` inside this `FormArray`. The label will be followed by a number to indicate current `FormGroup`'s position.

  ```javascript
  {
    "formArray": {
      template: {
        templateLabel: "User",
        ...
      },
      ...
    }
  }

  // Output: User 1, User 2, ...
  ```

- ### `template`

  Data to tell how to construct each `FormGroup` of this `FormArray`. It uses interface `FormControlConfig`.

- ### `length` (optional)

  The initial number of `FormGroup` to generate in this `FormArray`. If `value` is provided, the length of `value` will be used.

- ### `editable` (optional)

  Show add and remove button for user to add or remove `FormGroup` from this `FormArray`.

- ### `minLength` (optional)

  Minimum length of this `FormArray` is allowed.

- ### `maxLength` (optional)
  Maximum length of this `FormArray` is allowed.
