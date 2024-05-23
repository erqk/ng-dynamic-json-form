# Getting started

## Installation

### Install from npm

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
    "ng-dynamic-json-form/styles/styles.scss"
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

Pass the `configs` to the `ng-dynamic-json-form` component, a simple form will be built. See [FormControlConfig]() for more.

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