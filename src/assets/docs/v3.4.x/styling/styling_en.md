# Styling

## Form styling

### CSS variables

These are the predefined CSS variables, you can overwrite them with your desire value.

```css
.ng-dynamic-json-form {
  --color-primary: rgb(83, 72, 236);
  --color-primary-lighter: rgb(115, 106, 243);

  --font-size-title: 1.2rem;
  --font-size-subtitle: 1rem;

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

## Form layout

These are some examples show how different value inside `cssGrid` can
change the layout of your form:

### Example 1

<div class="example-wrapper">
  <div class="css-grid-example">
    <div class="form-group">
      <div class="form-control" style="grid-column: 1">Control 1</div>
      <div class="form-control" style="grid-column: 2">Control 2</div>
      <div class="form-control" style="grid-column: span 2">Control 3</div>
    </div>
  </div>

```javascript
{
  cssGrid: { gridColumn: "1" }, // Control 1
},
{
  cssGrid: { gridColumn: "2" }, // Control 2
},
...
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

```javascript
{
  cssGrid: { gridColumn: "1" }, // Control 1
},
{
  cssGrid: { gridColumn: "span 5" }, // Control 2
},
{
  cssGrid: { gridColumn: "span 6" }, // Control 3
},
{
  cssGrid: { gridColumn: "span 3" }, // Control 4
},
{
  cssGrid: { gridColumn: "span 3" }, // Control 5
},
...
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

```javascript
{
  cssGrid: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  chidren: [
    // control 1,
    // control 2,
    // control 3,
    // control 4,
    // control 5,
    // control 6
  ]
},
...
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

```javascript
{
  cssGrid: { gridColumn: "1" }, // Control 1
},
{
  cssGrid: { gridColumn: "2", gridRow: "1/3" }, // Control 2
},
{
  cssGrid: { gridColumn: "1", gridRow: "2/3" }, // Control 3
},
...
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

### Custom header

To use header with different layout and styling, use `ng-template` with the selector `#formArrayGroupHeader`.

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [jsonData]="jsonData"
  (formGet)="onFormGet($event)"
>
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
