# Validators

All the Angular’s built-in validators are supported.

> The `email` validator is not using `Validators.email` but using `Validators.pattern`: `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/`

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

To use custom validators, set the `name` with value that match with the key inside `customValidators`.

<doc-tab>
<doc-code name="Config">

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
<doc-code name="TS">

```ts
...
@Component({...})
export class YourComponent {
  validators = {
    firstUppercase: firstUppercaseValidator,
  };
}
```

</doc-code>
<doc-code name="HTML">

```html
<ng-dynamic-json-form ... [customValidators]="validators"></ng-dynamic-json-form>
```

</doc-code>
</doc-tab>

### Provide custom validators globally

The custom validators can be provided in the providers, by using `provideNgDynamicJsonForm()` , to make it becomes available globally.

<doc-code>

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
