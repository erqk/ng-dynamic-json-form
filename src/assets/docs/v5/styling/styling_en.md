# Styling

## CSS Variables

These are the predefined CSS variables, can be overwritten.

| Variable                          | Default | Description                                          |
| :-------------------------------- | :------ | :--------------------------------------------------- |
| --color-primary                   | #3b82f6 | Primary color of the default UI.                     |
| --color-error                     | gray    | Text color for error message.                        |
| --color-border                    | #ff4747 | Border color of input.                               |
| --font-family                     | gray    | Font family to use in the form.                      |
| --font-size-title                 | 1.2em   | Font size of FormGroup and FormArray.                |
| --font-size-label                 | 1em     | Font size of the input label.                        |
| --font-size-description           | 0.925em | Font size of the description.                        |
| --font-size-error                 | 0.925em | Font size of the error message.                      |
| --font-weight-title               | 700     | Font weight of the title in FormGroup and FormArray. |
| --font-weight-label               | 500     | Font weight of the input label.                      |
| --input-border-width              | 1px     | Border width of the input.                           |
| --column-gap                      | 1em     | Gap between input in a row.                          |
| --row-gap                         | 1.5em   | Gap between input in the form.                       |
| --options-column-gap              | 1.85em  | Gap between the columns in the options.              |
| --options-row-gap                 | 0.25em  | Gap between the rows in the options.                 |
| --form-array-item-divider-color   | #e1e1e1 | Color of the divider in the FormArray.               |
| --form-array-item-divider-weight  | 1px     | Weight of the divider in the FormArray.              |
| --form-array-item-divider-spacing | 2em     | Spacing of the divider in the FormArray.             |

## Layout

Control the layout of each input, support class and inline styles.

```javascript
export interface FormLayout {
  hostClass?: string;
  hostStyles?: string;
  labelClass?: string;
  labelStyles?: string;
  contentClass?: string;
  contentStyles?: string;
  descriptionClass?: string;
  descriptionStyles?: string;
  descriptionPosition?: "before" | "after";
  hideValidationMessage?: boolean;
  hideLabel?: boolean;
  contentCollapsible?: "collapse" | "expand";
}
```

### Properties

| Property              | Description                             |
| :-------------------- | :-------------------------------------- |
| hostClass             | See [Class & styles](#class--styles).   |
| hostStyles            | See [Class & styles](#class--styles).   |
| labelClass            | See [Class & styles](#class--styles).   |
| labelStyles           | See [Class & styles](#class--styles).   |
| contentClass          | See [Class & styles](#class--styles).   |
| contentStyles         | See [Class & styles](#class--styles).   |
| descriptionClass      | See [Class & styles](#class--styles).   |
| descriptionStyles     | See [Class & styles](#class--styles).   |
| descriptionPosition   | Position relative to input element.     |
| hideValidationMessage | Hide the error message of this control. |
| hideLabel             | Hide the label of this control.         |
| contentCollapsible    | See [Collapsible](#collapsible).        |

## Class & styles

Control the styling of the specific section of each control. The sections are `host`, `label`, `content` and `description`. Each section can be styled using class and inline style.

<br>

<div class="docs-control-layout">
  <div class="label">label</div>
  <div class="content">
    <div class="description">description</div>
    <input type="text">
    <div class="errors">Error messages</div>
  </div>
</div>

## Layout components and templates

`layoutComponents` and `layoutTemplates` provide the following properties for default UI replacement.

| Property            | Description                                               |
| :------------------ | :-------------------------------------------------------- |
| errorMessage        | See [Custom error message](#custom-error-message).        |
| loading             | See [Custom loading](#custom-loading).                    |
| formArrayItemHeader | See [Form array item's header](#form-array-items-header). |

The data can be provided by using provider or property binding:

```javascript
...
providers: [
  provideNgDynamicJsonForm({
    layoutComponents: {
      errorMessage: ...,
      loading: ...,
      formArrayItemHeader: ...,
    },
  }),
],
```

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutComponents]="{
    errorMessage: ...,
    loading: ...,
    formArrayItemHeader: ...
  }"
  [layoutTemplates]="{
    [key: string]: ...,
    ...
  }"
></ng-dynamic-json-form>
```

## Custom error message

The template for all the error messages in the form.

<table>
  <thead>
    <tr>
      <th style="width: 50%">Default</th>
      <th style="width: 50%">Custom</th>
    <tr>
  </thead>

  <tbody>
    <tr>
      <td style="vertical-align: top">
        <custom-error-message></custom-error-message>
      </td>
      <td style="vertical-align: top">
        <custom-error-message custom-error="true"></custom-error-message>
      </td>
    </tr>
  </tbody>
</table>

> To customize specific control, set `layout.hideValidationMessage` to `true` and use `customComponent`. Then you can get the error messages in the component and control how to display them. See [Custom Components](../../v5/custom-components/custom-components_en.md).

### Using component

Create a component that extends `ErrorMessageComponent`, then pass it to the `errorMessage` inside `layoutComponents`.

```javascript
export class CustomErrorMessageComponent extends ErrorMessageComponent {}
```

```html
<ng-container *ngFor="let item of errorsMessages">
  <div class="flex items-start gap-2 text-rose-600 text-sm">
    <i class="bi bi-exclamation-triangle"></i>
    <span>{{ item }}</span>
  </div>
</ng-container>
```

### Using &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    errorMessage: errorTemplate
  }"
>
  <ng-template #errorTemplate let-control="control" let-messages="messages">
    <ng-container *ngFor="let item of messages">
      <div>{{ item }}</div>
    </ng-container>
  </ng-template>
</ng-dynamic-json-form>
```

## Custom loading

The UI to be used when the data is loading.

<table>
  <thead>
    <tr>
      <th style="width: 50%">Default</th>
      <th style="width: 50%">Custom</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <select style="margin: 0 0.25rem; width: calc(100% - 0.5rem); filter: grayscale(1); opacity: 0.5; pointer-events: none;">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </td>
      <td>
        <custom-loading></custom-loading>
      </td>
    </tr>
  </tbody>
</table>

### Using component

Pass the component to the `loading` inside `layoutComponents`.

### Using &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    loading: loadingTemplate
  }"
>
  <ng-template #loadingTemplate>
    <div>Loading...</div>
  </ng-template>
</ng-dynamic-json-form>
```

## Form array item's header

### Properties

The properties that can be used to build custom header.

| Property     | description                                                                      |
| :----------- | :------------------------------------------------------------------------------- |
| config       | Config of the FormArray. See [Form Array](../../v5/form-array/form-array_en.md). |
| index        | Index of the form group in the form array.                                       |
| formArray    | The FormArray itself.                                                            |
| templateForm | The FormGroup to build this FormArray.                                           |
| buttonEvent  | Consists of `add`, `remove` method to add or remove item in this FormArray.      |

### Using component

Create a component that extends `FormArrayItemHeaderComponent`, then pass it to `formArrayItemHeader` inside `layoutComponents`.

```javascript
export class CustomHeaderComponent extends FormArrayItemHeaderComponent {}
```

```html
<div class="flex justify-between">
  <span>{{ config?.templateLabel }} {{ index }}</span>
  <div class="flex gap-4">
    <button (click)="buttonEvent.add()">ADD</button>
    <button (click)="buttonEvent.remove()">REMOVE</button>
  </div>
</div>
```

### Using &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    formArrayItemHeader: headerTemplate
  }"
>
  <ng-template #headerTemplate let-config="config" let-buttonEvent="buttonEvent">
    <div class="my-custom-group-header">
      <span>{{ config.templateLabel }}</span>
      <button type="button" (click)="buttonEvent.add()">+</button>
      <button type="button" (click)="buttonEvent.remove()">-</button>
    </div>
  </ng-template>
</ng-dynamic-json-form>
```

## Collapsible

It will add a toggle functionality to the label/title of the control to expand/collapse it's content. The `label` must be provided together.

```json
{
  ...
  "label": "Label",
  "layout": {
    "contentCollapsible": "collapse"
  }
}
```

| Value    | Description                    |
| :------- | :----------------------------- |
| collapse | Collapse the content at start. |
| expand   | Expand the content at start.   |

### Properties

The properties that can use to build custom form title.

| Property    | Description                            |
| :---------- | :------------------------------------- |
| label       | The label of this control.             |
| toggle      | The method to toggle collapse/expand.  |
| collapsible | `contentCollapsible` is set.           |
| expand      | The boolean state of this collapsible. |

### Using component

Create a component that extends `FormTitleComponent`, and pass it to `formTitle` inside `layoutComponents` by using provider or property binding.

```javascript
export class CustomFormTitleComponent extends FormTitleComponent {}
```

```html
<button type="button" (click)="toggle()">
  <span>{{ label }}</span>
  ...
</button>
```

### Using &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    formTitle: titleTemplate
  }"
>
  <ng-template #titleTemplate let-label="label" let-toggle="toggle" let-expand="expand">
    <button type="button" class="custom-form-title" (click)="toggle()">
      <span>{{ label }}</span>
      ...
    </button>
  </ng-template>
</ng-dynamic-json-form>
```
