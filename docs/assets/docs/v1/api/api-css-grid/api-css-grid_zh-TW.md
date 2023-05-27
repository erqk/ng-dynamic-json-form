## CSS Grid

表單內的版型是基於 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" target="_blank">CSS Grid</a> 達成的，因此你可以提供以下參數來組合出不同的版型：

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

| 欄位                  | 說明                                      |
| :-------------------- | :---------------------------------------- |
| `gridTemplateColumns` | 等同於 CSS 屬性 `grid-template-columns`。 |
| `gridColumn`          | 等同於 CSS 屬性 `grid-column`。           |
| `gridRow`             | 等同於 CSS 屬性 `grid-template-columns`。 |

> 每個屬性的詳細內容和範例，可以參閱 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns" target="_blank">grid-template-columns
> </a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column" target="_blank">grid-column
> </a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row" target="_blank">grid-row
> </a>。
>
> 更多版型範例，請參考 **樣式** 頁面。
