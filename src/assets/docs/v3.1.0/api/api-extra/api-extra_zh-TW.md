## 額外設定（extra）

針對不同元件的額外參數設定。

| 類型     | 屬性          | 說明                                 |
| :------- | :------------ | :----------------------------------- |
| checkbox | labelPosition | 文字說明位置, `before` \|\| `after`. |
|          |               |                                      |
| date     | min           | 最小日期                             |
|          | max           | 最大日期                             |
|          | displayFormat | 日期顯示格式                         |
|          | outputFormat  | 日期輸出格式                         |
|          |               |                                      |
| radio    | labelPosition | 文字說明位置, `before` \|\| `after`  |
|          |               |                                      |
| range    | min           | 最小值                               |
|          | max           | 最大值                               |
|          |               |                                      |
| switch   | label         | 文字說明                             |
|          | labelPosition | 文字說明位置, `before` \|\| `after`  |
|          |               |                                      |
| textarea | rows          | Textarea 列數量                      |
|          | cols          | Textarea 欄位數量                    |
|          | autoResize    | 是否根據內容自動調整高度             |

> 你可以使用其他的 `類型`，用於你自己的自訂元件。

範例:

```html
<!-- prettier-ignore -->
<ng-container *ngIf="control && data">
  <textarea
    [rows]="data.extra?.textarea?.rows || 5"
    [cols]="data.extra?.textarea?.cols || 30"
    ...
  ></textarea>
</ng-container>
```
