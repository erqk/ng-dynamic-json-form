## 額外設定（extra）

可塞入額外的參數

範例:

```html
<!-- prettier-ignore -->
<ng-container *ngIf="control && data">
  <textarea pInputTextarea
    [rows]="data.extra?.['rows'] || 5"
    [cols]="data.extra?.['cols'] || 30"
    [formControl]="control"
    [autoResize]="data.extra?.['autoResize'] === true"
  ></textarea>
</ng-container>
```
