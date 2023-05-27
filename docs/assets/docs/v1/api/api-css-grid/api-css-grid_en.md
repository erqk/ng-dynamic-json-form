## CSS Grid

The form generated is using
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" target="_blank">CSS Grid layout</a>. Hence every input field in the form can size differently by setting the following properties.

```javascript
{
  "cssGrid": {
    "gridTemplateColumns": "...",
    "gridColumn": "...",
    "gridRow": "..."
  },
  ...
}
```

| key                   | description                                            |
| :-------------------- | :----------------------------------------------------- |
| `gridTemplateColumns` | Equivalant to `grid-template-columns` property in CSS. |
| `gridColumn`          | Equivalant to `grid-column` property in CSS.           |
| `gridRow`             | Equivalant to `grid-template-columns` property in CSS. |

> For documentation and example for each of the property, see <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns" target="_blank">grid-template-columns
> </a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column" target="_blank">grid-column
> </a> and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row" target="_blank">grid-row
> </a>.
>
> Navigate to **Styling** section to see some examples.
