# Getting started

> Supports only Angular 16 and above.

## Installation

### Install from npm [🔗](https://www.npmjs.com/package/ng-dynamic-json-form)

<doc-code>

```json
npm i ng-dynamic-json-form
```

</doc-code>

### Import styles

Import the styles with one of the following method.

<doc-tab>
<doc-code name="angular.json">

```json
"styles": [
    ...
    "node_modules/ng-dynamic-json-form/styles/styles.scss"
],
```

</doc-code>
<doc-code name="styles.scss">

```scss name="styles.scss"
...
@use "ng-dynamic-json-form/styles/styles.scss";

// Use @use instead of @import
// See https://sass-lang.com/documentation/at-rules/import
```

</doc-code>
</doc-tab>

## Usage

Import the `NgDynamicJsonFormComponent`.

<doc-code>

```typescript
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';

...
@Component({
  ...,
  imports: [
    ...,
    NgDynamicJsonFormComponent,
  ],
})
```

</doc-code>

Pass the `configs` to the `ng-dynamic-json-form` component, a simple form will be built. See [Configs](../../v8/configs/configs_en.md) for more.

<doc-tab>
<doc-code name="HTML">

```html
<ng-dynamic-json-form [configs]="configs"></ng-dynamic-json-form>
```

</doc-code>
<doc-code name="TS">

```typescript
configs = [
  {
    formControlName: "name",
    label: "Name",
    type: "text",
  },
];
```

</doc-code>
</doc-tab>

<doc-form-viewer show-form-only="true" configs='[
    {
      "formControlName": "name",
      "label": "Name"
    }
]'></doc-form-viewer>

## Add UI library

We can use component from the other ui library in the entire form. See [Provide UI Components](../../v8/ui-components/ui-components_en.md#provide-ui-components).

## Form Binding

### Using FormControl

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  [formControl]="control"
></ng-dynamic-json-form>
```

</doc-code>
<doc-code name="TS">

```typescript
control = new FormControl();
```

</doc-code>
</doc-tab>

### Using FormGroup

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

</doc-code>
<doc-code name="TS">

```typescript
form?: UntypedFormGroup;

onFormGet(e: UntypedFormGroup): void {
  this.form = e;
}
```

</doc-code>
</doc-tab>

## Event Listening

After the form is generated, the `formGet` event will emit an `UntypedFormGroup`. We can get the form and listen to the `valueChanges` event.

```tsx
form?: UntypedFormGroup;

onFormGet(e: UntypedFormGroup): void {
  this.form = e;
  this.form.valueChanges.pipe(
    ...
  ).subscribe();
}

```

Or listen to only specific control and do specific task.

```tsx
form?: UntypedFormGroup;

onFormGet(e: UntypedFormGroup): void {
  this.form = e;
  this.form.controls.name.valueChanges.pipe(
    tap(x => {
      if (x.length > 10) {
        ...
      }
    })
  ).subscribe();
}

```
