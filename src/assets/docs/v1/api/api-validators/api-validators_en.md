## Validators

A list of validators to add to this `AbstractControl`.

| name         | description                                                              |
| :----------- | :----------------------------------------------------------------------- |
| required     | `Validators.required`                                                    |
| requiredTrue | `Validators.requiredTrue`                                                |
| min          | `Validators.min(value)`                                                  |
| max          | `Validators.max(value)`                                                  |
| minLength    | `Validators.minLength(value)`                                            |
| maxLength    | `Validators.maxLength(value)`                                            |
| pattern      | `Validators.pattern(value)`                                              |
| email        | Custom validator using pattern `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/` |
| custom       | To use `customValidators` with `value` as the key                        |

```json
//...
"validators": [
  {
    "name": "...",
    "value": "...",
    "message": "..."
  }
]
```

- ### `name`

  See the table above.

- ### `value` (optional)

  For the validators that needs a value to work. See the table above.

- ### `message` (optional)

  Custom validation message. Support template `{{value}}` to display current value of this `AbstractControl`.

  ```javascript
  {
  //...
  "message": "Your id: {{value}} is invalid"
  }

  // Output: Your id: 123456 is invalid
  ```
