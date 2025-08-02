# Form Component

## InputSignal

````js
configs = input<FormControlConfig[] | string>();
/**
 * User defined custom components. Use `formControlName` as the key to map target component.
 *
 * @example
 * // Config
 * {
 *    ...
 *    "formControlName": "compA"
 * }
 *
 * // TS
 * components = {
 *    compA: YourComponentA,
 *    compB: YourComponentB,
 *    ...
 * }
 */
customComponents = input<CustomComponents>();
/**
 * Custom templates for input, using `formControlName` as the key.
 * Use this if creating a custom component is way too much.
 *
 * The template variables available:
 * - `control` The FormControl for this input
 * - `data` The config for this input
 */
customTemplates = input<CustomTemplates>();
/**
 * Functions to execute when conditions is met.
 * @description
 * - When there's condition met, the function with key that match will be called.
 * - The function contains an optional argument, which is the control of where the conditions will affect to.
 */
conditionsActionFunctions = input<ConditionsActionFunctions>();

collapsibleState = input<FormLayout['contentCollapsible']>();
descriptionPosition = input<FormLayout['descriptionPosition']>();
rootClass = input<string>();
rootStyles = input<string>();
hideErrorMessage = signal<boolean | undefined>(undefined);

// Custom error components/templates
errorComponents = input<CustomErrorComponents>();
errorComponentDefault = input<Type<CustomErrorMessage>>();
errorTemplates = input<CustomTemplates>();
errorTemplateDefault = input<TemplateRef<any>>();

// Custom label components/templates
labelComponents = input<CustomLabelComponents>();
labelComponentDefault = input<Type<CustomFormLabel>>();
labelTemplates = input<CustomTemplates>();
labelTemplateDefault = input<TemplateRef<any>>();

// Custom loading components/templates
loadingComponent = input<Type<any>>();
loadingTemplate = input<TemplateRef<any>>();
/**
 * Custom observables for the options
 * @description
 * The observable with key that match with the `src` will be used.
 *
 * @example
 * ```ts
 * optionsSources = {
 *    'getCountries': ...
 * }
 *
 * config = {
 *  ...
 *  options: {
 *    ...
 *    src: 'getCountries'
 *  }
 * }
 * ```
 */
optionsSources = input<{ [key: string]: Observable<OptionItem[]> }>();
````

### configs

See [Configs](../../v8/configs/configs_en.md).

### customComponents

See [Custom Components](../../v8/custom-components/custom-components_en.md).

### conditionsActionFuntions

See [Execute custom function](../../v8/conditions/conditions_en.md#execute-custom-function).

### collapsibleState

Control all of the collapsible states.

### descriptionPosition

Set the default description position for every field.

### rootClass, rootStyes

Class and styles for the root form container.

### hideErrorMessage

Control the display of all the error messages. Useful when need to show all the errors immediately when submit button is clicked.

<doc-tab>

<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
	...
	[formControl]="control"
	[hideErrorMessage]="hideErrors"
></ng-dynamic-json-form>

<button type="submit" (click)="submit()"></button>

```

</doc-code>

<doc-code name="TS">

```tsx
control = new FormControl();
hideErrors?: boolean;

submit(): void {
	if (this.control.invalid) {
		this.hideErrors = false;
		return;
	}
	...
}

```

</doc-code>

</doc-tab>

> In order to trigger change detection, we must leave the `hideErrors` undefined at first, then set its value later when submit button is pressed.

### optionsSources

The custom observables for options. See [Use custom observable](../../v8/options/options_en.md#use-custom-observable).

### error...

- `errorComponents`
- `errorComponentDefault`
- `errorTemplates`
- `errorTemplateDefault`

See [Custom Error](../../v8/custom-error/custom-error_en.md).

### label...

- `labelComponents`
- `labelComponentDefault`
- `labelTemplates`
- `labelTemplateDefault`

See [Custom Label](../../v8/custom-label/custom-label_en.md).

### loading...

- `loadingComponent`
- `loadingTemplate`

See [Custom Loading](../../v8/custom-loading/custom-loading_en.md).

## OutputEmitterRef

```js
formGet = output<UntypedFormGroup>();
/**
 * The value change event of the form, which trigger by the user
 * (by checking click or keydown event)
 */
onChange = output<any>();
optionsLoaded = output<void>();
displayValue = output<FormDisplayValue>();
updateStatusFunctions = output<FormStatusFunctions>();
```

### formGet

The event called after form generation complete. The generated `UntypedFormGroup` will be emitted.

### onChange

The event of form value when it's changed by user.

### optionsLoaded

The event called after all of the options are loaded.

### displayValue

Useful if you need to get the `form.value` with either:

1. The formControlName replaced with label
2. The option's value replaced with display text

```ts
{
  keyMapped: any;
  keyPreserved: any;
}
```

### updateStatusFunctions

Emit all the functions needed to change form status.

```ts
{
  setDirty: () => void;
  setPristine: () => void;
  setTouched: () => void;
  setUntouched: () => void;
}
```
