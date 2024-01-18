# 樣式

## 表單樣式

### CSS 變數

以下是定義好的 CSS 變數，你可以覆寫為其他想要的值。

```css
.ng-dynamic-json-form {
  --font-size-title: 1.2rem;
  --font-size-subtitle: 1rem;

  --row-gap: 1.5rem;
  --column-gap: 1rem;
  --group-gap: 2rem;

  --form-array-group-divider-color: #e1e1e1;
  --form-array-aroup-divider-weight: 1px;
  --form-array-group-divider-spacing: 2rem;
}

.ng-dynamic-json-form.ui-basic {
  --color-primary: rgb(83, 72, 236);
  --color-primary-lighter: rgb(115, 106, 243);
}
```

## 表單版型

以下是一些使用了 `cssGrid` 內不同的值所組合出來的表單版型範例：

### 範例 1

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

### 範例 2

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

### 範例 3

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

### 範例 4

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
