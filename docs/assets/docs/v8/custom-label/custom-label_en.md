# Custom Label

## Create a custom label

### Using component

Create a component and extends/implements it with the abstract class `CustomFormLabel`.

```tsx
import { Component } from '@angular/core';
import { CustomFormLabel } from 'ng-dynamic-json-form';

@Component({
	...
})
export class CustomFormLabelComponent extends CustomFormLabel {}
```

### Using ng-template

Create a ng-template, and add the properties needed.

```html
<ng-template #customLabelTemplate let-label="label" let-layout="layout" ...> ... </ng-template>
```

## Properties

| Name        | Type       | Description                                          |
| ----------- | ---------- | ---------------------------------------------------- |
| collapsible | boolean    | Whether the content of this input is collapsible.    |
| expand      | boolean    | The expand state of the content of this input.       |
| label       | string     | The text for this label.                             |
| layout      | FormLayout | The layout from the FormControlConfig of this input. |
| props       | any        | The props from the FormControlConfig of this input.  |

## Overwrite all the labels

### Using provider

```tsx
import { Component } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';
import { CustomFormLabelComponent } from '...';

@Component({
	...
  providers: [
    provideNgDynamicJsonForm({
	    ...
      labelComponent: CustomFormLabelComponent
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
    [labelComponentDefault]="labelComponent"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
import { CustomLabelComponent } from "...";

labelComponent = CustomLabelComponent;
```

</doc-code>
</doc-tab>

### Using ng-template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
    ... 
    [labelTemplateDefault]="defaultLabelTemplate"
></ng-dynamic-json-form>

<ng-template #defaultLabelTemplate let-label="label">...</ng-template>
```

## Overwrite only specific label

Provide either `labelComponents` or `labelTemplates` using property binding. The `formControlName` is use as the key to specify which label needs to be replaced.

### Using components

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
    ...
    [labelComponents]="labelComponents"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
labelComponents = {
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
    [labelTemplates]="{
        name: nameLabelTemplate,
        age: ageLabelTemplate
    }"
></ng-dynamic-json-form>

<ng-template #nameLabelTemplate let-label="label">...</ng-template>
<ng-template #ageLabelTemplate let-label="label">...</ng-template>
```
