# Validators

## Properties

```javascript
export interface ValidatorConfig {
  name: FormControlConditionType;
  value?: any;
  message?: string;
  flags?: string;
}
```

| Property | Description                                                                        |
| :------- | :--------------------------------------------------------------------------------- |
| name     | Validator's name.                                                                  |
| value    | Value of the validator.                                                            |
| message  | Custom validation message. Use {{value}} placeholder to display the current value. |
| flags    | Flags for `pattern` validator.                                                     |

> The validators are come from [Angular's built-in validators](https://angular.io/api/forms/Validators), except `email` that's using this pattern: `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/`.

## Validator list

| Name                      | Value  |
| :------------------------ | :----- |
| required                  | -      |
| requiredTrue              | -      |
| min                       | number |
| max                       | number |
| minLength                 | number |
| maxLength                 | number |
| pattern                   | string |
| email                     | -      |
| ...custom validator's key | -      |

## Custom validators

Put all your custom `ValidatorFn` into an object, then bind it to `customValidators`.

### Setup using provider

```javascript
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

{
  ...
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
      }
    }),
  ]
}
```

### Setup using property binding

```javascript
validators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

```HTML
<ng-dynamic-json-form
 [configs]="..."
 [customValidators]="validators"
></ng-dynamic-json-form>
```

### Usage

Specify `name` by using the key inside `customValidators` to use the validador.

```json
{
  ...
  "validators": [
    ...
    {
      "name": "firstUppercase"
    }
  ]
}
```

## Example

```json
{
  ...
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
      "name": "firstUppercase"
    }
  ]
}
```
