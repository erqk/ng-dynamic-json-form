## 額外設定（extra）

針對不同元件的額外參數設定。有些屬性不存在於某些元件，例如 primeng 的 slider 就不存在刻度，因此 `showTickMarks` 無效。若有類似的需求，你可以使用自訂元件。

| 類型     | 屬性             | 說明                                 |
| :------- | :--------------- | :----------------------------------- |
| checkbox | labelPosition    | 文字說明位置, `before` \|\| `after`. |
| -        | -                | -                                    |
| date     | min              | 最小日期                             |
|          | max              | 最大日期                             |
|          | selectTime       | 顯示時間選擇器                       |
|          | displayFormat    | 日期顯示格式                         |
|          | outputFormat     | 日期輸出格式，預設是 UTC             |
| -        | -                | -                                    |
| radio    | labelPosition    | 文字說明位置, `before` \|\| `after`  |
| -        | -                | -                                    |
| range    | min              | 最小值                               |
|          | max              | 最大值                               |
|          | step             | Slider 的跳躍值                      |
|          | showCurrentValue | 滑動的時候顯示當前數值               |
|          | showTickMarks    | 是否顯示刻度                         |
| -        | -                | -                                    |
| switch   | label            | 文字說明                             |
|          | labelPosition    | 文字說明位置, `before` \|\| `after`  |
| -        | -                | -                                    |
| textarea | rows             | Textarea 列數量                      |
|          | cols             | Textarea 欄位數量                    |
|          | autoResize       | 是否根據內容自動調整高度             |

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
