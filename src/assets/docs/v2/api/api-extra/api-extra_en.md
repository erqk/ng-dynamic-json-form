## Extra

Extra information to configure input element.

Example:

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
