# Styling

## CSS Variables

These are the predefined CSS variables, you can overwrite them with your desire value.

```css
.ng-dynamic-json-form {
  --color-primary: #3b82f6;
  --color-primary-lighter: #bfdbfe;
  --color-error: #ff4747;
  --color-border: gray;

  --font-size-title: 1.2rem;
  --font-size-subtitle: 1rem;

  --input-border-width: 0.125em;

  --row-gap: 1.5rem;
  --column-gap: 1rem;
  --group-gap: 2rem;

  --options-column-gap: 1.85rem;
  --options-row-gap: 0.25rem;

  --form-array-group-divider-color: #e1e1e1;
  --form-array-aroup-divider-weight: 1px;
  --form-array-group-divider-spacing: 2rem;
}
```

## CSS Grid

Control how the input occupy the space.

```javascript
cssGrid?: {
	gridRow?: string;
	gridColumn?: string;
	gridTemplateColumns?: string;
};
```

> See [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns), [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column), and [grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row) for more details.

### Example 1

<div class="example-wrapper">
  <div class="css-grid-example">
    <div class="form-group">
      <div class="form-control" style="grid-column: 1">Control 1</div>
      <div class="form-control" style="grid-column: 2">Control 2</div>
      <div class="form-control" style="grid-column: span 2">Control 3</div>
    </div>
  </div>

```json
{
  "cssGrid": {
    "gridTemplateColumns": "repeat(2, 1fr)"
  },
  "children": [
    {
      "formControlName": "Control1",
      "cssGrid": {
        "gridColumn": "1"
      }
    },
    {
      "formControlName": "Control2",
      "cssGrid": {
        "gridColumn": "2"
      }
    },
    {
      "formControlName": "Control3"
    }
  ]
}
```

</div>

### Example 2

<div class="example-wrapper">
  <div class="css-grid-example">
    <div class="form-group">
      <div class="form-control" style="grid-column: 1">Control 1</div>
      <div class="form-control" style="grid-column: span 5">Control 2</div>
      <div class="form-control" style="grid-column: span 6">Control 3</div>
      <div class="form-control" style="grid-column: span 3">Control 4</div>
      <div class="form-control" style="grid-column: span 3">Control 5</div>
    </div>
  </div>

```json
{
  "cssGrid": {
    "gridTemplateColumns": "repeat(6, 1fr)"
  },
  "children": [
    {
      "formControlName": "Control1",
      "cssGrid": {
        "gridColumn": "1"
      }
    },
    {
      "formControlName": "Control2",
      "cssGrid": {
        "gridColumn": "span 5"
      }
    },
    {
      "formControlName": "Control3"
    },
    {
      "formControlName": "Control4",
      "cssGrid": {
        "gridColumn": "span 3"
      }
    },
    {
      "formControlName": "Control5",
      "cssGrid": {
        "gridColumn": "span 3"
      }
    }
  ]
}
```

</div>

### Example 3

<div class="example-wrapper">
  <div class="css-grid-example">
    <div class="form-group" style="grid-template-columns: repeat(2, 1fr)">
      <div class="form-control">Control 1</div>
      <div class="form-control">Control 2</div>
      <div class="form-control">Control 3</div>
      <div class="form-control">Control 4</div>
      <div class="form-control">Control 5</div>
      <div class="form-control">Control 6</div>
    </div>
  </div>

```json
{
	"cssGrid": {
		"gridTemplateColumns": "repeat(2, 1fr)"
	},
	"children": [...]
}
```

</div>

### Example 4

<div class="example-wrapper">
  <div class="css-grid-example">
    <div class="form-group" style="grid-template-columns: repeat(2, 1fr)">
      <div class="form-control" style="grid-column: 1">Control 1</div>
      <div class="form-control" style="grid-column: 2; grid-row: 1/3">
        Control 2
      </div>
      <div class="form-control">Control 3</div>
      <div class="form-control" style="grid-column: span 2">Control 4</div>
    </div>
  </div>

```json
{
  "cssGrid": {
    "gridTemplateColumns": "repeat(2, 1fr)"
  },
  "children": [
    {
      "formControlName": "Control1",
      "cssGrid": {
        "gridColumn": "1"
      }
    },
    {
      "formControlName": "Control2",
      "cssGrid": {
        "gridColumn": "2",
        "gridRow": "1/3"
      }
    },
    {
      "formControlName": "Control3",
      "cssGrid": {
        "gridColumn": "1",
        "gridRow": "2/3"
      }
    }
  ]
}
```

</div>

## Form array group's header

### Default header

This is what the default header will look like:

<div class="ng-dynamic-json-form" style="border: solid 1px rgba(128, 128, 128, 0.35); padding: 1rem; border-radius: 0.35rem;">
  <div class="form-array-container" style="margin: 0;">
    <div class="form-array-group-header" style="margin: 0;">
      <span class="label">Header label</span>
      <div class="buttons">
        <button type="button" class="btn-add"><span></span></button>
        <button type="button" class="btn-remove"><span></span></button>
      </div>
    </div>
  </div>
</div>
<br>

### Custom header

To use header with different layout and styling, use `ng-template` with the selector `#formArrayGroupHeader`.

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form ...>
  <ng-template
    #formArrayGroupHeader
    let-label="label"
    let-index="index"
    let-formArray="formArray"
    let-templateForm="templateForm"
    let-buttonEvent="buttonEvent"
  >
    <div class="my-custom-group-header">
      <span>{{ label }}</span>
      <button type="button" (click)="buttonEvent.add()">+</button>
      <button type="button" (click)="buttonEvent.remove()">-</button>
    </div>
  </ng-template>
</ng-dynamic-json-form>
```

<br>

| variable     | description                                                      |
| :----------- | :--------------------------------------------------------------- |
| label        | Header's label.                                                  |
| index        | Index of the form group in the form array.                       |
| formArray    | The FormArray itself.                                            |
| templateForm | The FormGroup to build this FormArray.                           |
| buttonEvent  | Consists of `add`, `remove` method to manipulate this FormArray. |
