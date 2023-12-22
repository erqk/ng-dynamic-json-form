## Validators

```javascript
export interface ValidatorConfig {
  name: string;
  value?: any;
  message?: string;
}
```

> You can use `{{value}}` as a placeholder to the current value in your message.

To validate the input, add the `validators` like below:

```json
{
  ...,
  "validators": [
    {
      "name": "required",
      "message": "Please type your name"
    },
    {
      "name": "minLength",
      "value": 4
    },
    {
      "name": "pattern",
      "value": "\\D+",
      "message": "The current value contains invalid characters: {{value}}"
    },
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ]
}
```

The table below list all the available names, and the value that need to provide:

| name         | value                                  |
| :----------- | :------------------------------------- |
| required     | -                                      |
| requiredTrue | -                                      |
| min          | number                                 |
| max          | number                                 |
| minLength    | number                                 |
| maxLength    | number                                 |
| pattern      | string                                 |
| email        | -                                      |
| custom       | key from the `customValidators` object |

> Email validation is using this pattern: `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/`

## Custom validators

Apply your custom `ValidatorFn` to the input.

```javascript
{
  [key: string]: ValidatorFn
}
```

Put all your custom `ValidatorFn` into an object, then bind it to `[customValidators]`.

```javascript
validators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

```HTML
<ng-dynamic-json-form
 ...
 [customValidators]="validators"
></ng-dynamic-json-form>
```

Then, inside the JSON config, we set the value from the key inside `validators` above, to specify which `ValidatorFn` to use.

```json
{
  ...,
  "validators": [
    ...,
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ]
}
```
