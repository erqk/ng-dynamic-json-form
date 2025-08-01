# Validators

All the Angular’s built-in validators are supported.

> The `email` validator is not using `Validators.email` but using `Validators.pattern`: `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/`

## Validator config

<doc-code>

```json
{
  ...
  "validators": [
    {
      "name": "...",
      "value": "...",
      "message": "..."
    }
  ],
  "asyncValidators": [
    // Same with "validators"
    ...
  ]
}
```

### Properties

#### name

Name of the validator.

#### value

For the validator which needs value to validate like `min`, `max`.

#### message

Custom validation message for **Angular's built-in validators**. The placeholders available are:

- `{{value}}`
- `{{validatorValue}}`

## Validation message

We can set the custom validation message for Angular's built-in validators via `message` property.

### Display control's value

```json
validators: [
  {
    "name": "email",
    "message": "The current email format: "{{value}}" is invalid."
  },
]
```

> Result: The current email format: "123.com" is invalid.

### Display validator value

```json
validators: [
  {
    "name": "max",
    "value": 100,
    "message": "The value must not exceeds {{validatorValue}}!"
  }
]
```

> Result: The value must not exceeds 100!

### Default validation message

If `message` is not provided, then the default message set in the `validationMessages` will be used.

```ts
providers: [
  provideNgDynamicJsonForm({
      validationMessages: {
        required: 'This field is required.',
        min: 'The value must exceeds {{value}}!'
      }
  }),
],
```

## Add validator to control

To add validators to the control, simply provide the `validators` .

<doc-code>

```json
{
  "label": "Text",
  "formControlName": "text",
  "validators": [
    {
      "name": "required",
      "message": "Please fill in this input!"
    }
  ]
}
```

</doc-code>

### Validators that requires value

Some of the validators like `min`, `max` requires value to validate, provide the `value` so that the validator can works correctly.

<doc-code>

```json
{
  "label": "Text",
  "formControlName": "text",
  "type": "number",
  "validators": [
    {
      "name": "min",
      "message": "Minimum value is 10",
      "value": 10
    }
  ]
}
```

</doc-code>

## Custom validators

To use custom validators, add them to the `customValidators` in `provideNgDynamicJsonForm()` provider. Then, set the name in the validator config to match with the key in `customValidators` provider.

<doc-tab>

<doc-code name="app.config.ts">

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

export const appConfig: ApplicationConfig = {
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

</doc-code>

<doc-code name="JSON">

```json
{
	...
	"validators": [
		{
			"name": "firstUppercase"
		}
	]
}
```

</doc-code>

</doc-tab>

## Async validators

The way to use async validators is same with [Custom validators](#custom-validators).

<doc-tab>

<doc-code name="app.config.ts">

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

export const appConfig: ApplicationConfig = {
  ...
  providers: [
    provideNgDynamicJsonForm({
      customAsyncValidators: {
        firstUppercase: firstUppercaseValidator,
      }
    }),
  ]
}
```

</doc-code>

<doc-code name="JSON">

```json
{
	...
	"asyncValidators": [
		{
			"name": "firstUppercase"
		}
	]
}
```

</doc-code>

</doc-tab>
