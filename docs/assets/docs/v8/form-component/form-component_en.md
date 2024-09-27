# Form Component

## @Input

```tsx
@Input() configs: FormControlConfig[] | string = [];
@Input() customComponents?: CustomComponents;
@Input() customTemplates?: CustomTemplates;
@Input() conditionsActionFuntions?: ConditionsActionFunctions;
@Input() hideErrorMessage?: boolean;
@Input() collapsibleState?: FormLayout['contentCollapsible'];
@Input() errorComponents?: CustomErrorComponents;
@Input() errorComponentDefault?: Type<CustomErrorMessage>;
@Input() errorTemplates?: CustomTemplates;
@Input() errorTemplateDefault?: TemplateRef<any>;
@Input() labelComponents?: CustomLabelComponents;
@Input() labelComponentDefault?: Type<CustomFormLabel>;
@Input() labelTemplates?: CustomTemplates;
@Input() labelTemplateDefault?: TemplateRef<any>;
@Input() loadingComponent?: Type<any>;
@Input() loadingTemplate?: TemplateRef<any>;
@Input() optionsSources?: { [key: string]: Observable<OptionItem[]> };
```

### configs

See [Configs](../../v8/configs/configs_en.md).

### customComponents

See [Custom Components](../../v8/custom-components/custom-components_en.md).

### conditionsActionFuntions

See [Execute custom function](../../v8/conditions/conditions_en.md#execute-custom-function).

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

### collapsibleState

Control all of the collapsible states.

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

## @Output

```tsx
@Output() formGet = new EventEmitter<UntypedFormGroup>();
@Output() optionsLoaded = new EventEmitter();
@Output() displayValue = new EventEmitter<FormDisplayValue>();
@Output() updateStatusFunctions = new EventEmitter<FormStatusFunctions>();
```

### formGet

The event called after form generation complete. The generated `UntypedFormGroup` will be emitted.

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
