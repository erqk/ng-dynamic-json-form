# Custom Error

## Create a custom error

### Using component

Create a component and extends/implements the abstract class `CustomErrorMessage`.

```tsx
import { Component } from '@angular/core';
import { CustomErrorMessage } from 'ng-dynamic-json-form';

@Component({
	...
})
export class CustomErrorMessageComponent extends CustomErrorMessage {}
```

### Using ng-template

Create a ng-template, and add the properties needed.

```html
<ng-template #customErrorTemplate let-errorMessages="errorMessages"> ... </ng-template>
```

## Properties

| Name          | Type            | Description                        |
| ------------- | --------------- | ---------------------------------- |
| control       | AbstractControl | The AbstractControl of this input. |
| errorMessages | string[]        | The error messages of this input.  |

## Overwrite all the errors

### Using provider

```tsx
import { Component } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';
import { CustomErrorMessageComponent } from '...';

@Component({
	...
  providers: [
    provideNgDynamicJsonForm({
	    ...
      errorComponent: CustomErrorMessageComponent
    }),
  ]
})
```

### Using component

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
	...
	[errorComponentDefault]="errorComponent"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
import { CustomErrorComponent } from "...";

errorComponent = CustomErrorComponent;
```

</doc-code>
</doc-tab>

### Using ng-template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
	... 
	[errorTemplateDefault]="defaultErrorTemplate"
></ng-dynamic-json-form>

<ng-template #defaultErrorTemplate let-errorMessages="errorMessages">...</ng-template>
```

## Overwrite only specific error

Provide either `errorComponents` or `errorTemplates` using propery binding. The `formControlName` is use as the key to specify which error needs to be replaced.

### Using components

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
	...
	[errorComponents]="errorComponents"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
errorComponents = {
	name: ...,
	age: ...
}
```

</doc-code>
</doc-tab>

### Using ng-template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
	... 
	[errorTemplates]="{
		name: nameErrorTemplate,
		age: ageErrorTemplate
	}"
></ng-dynamic-json-form>

<ng-template #nameErrorTemplate let-errorMessages="errorMessages">...</ng-template>
<ng-template #ageErrorTemplate let-errorMessages="errorMessages">...</ng-template>
```
