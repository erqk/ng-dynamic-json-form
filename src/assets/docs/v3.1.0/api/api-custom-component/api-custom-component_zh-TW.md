## 自訂元件

### 建立

建立一個 component 並繼承 `NgDynamicJsonFormCustomComponent`。此元件內擁有必要的參數。

```javascript
...
export class MyCustomComponent extends NgDynamicJsonFormCustomComponent {}
...
```

> `NgDynamicJsonFormCustomComponent` 內的參數如下：
>
> ```javascript
> export class NgDynamicJsonFormCustomComponent {
>   @Input() control: UntypedFormControl | null = null;
>   @Input() data: FormControlConfig | null = null;
> }
> ```

好了，你現在可以建立任意類型的輸入元件了！

### 自訂複選框

像這種比較簡單的輸入元件，你可以這樣做：

在 template 內：

```HTML
<!-- ... -->
  <ng-container *ngFor="let item of data.options">
    <div class="field-checkbox">
      <p-checkbox
        [(ngModel)]="selectedItems"
        [name]="'group'"
        [value]="item.value"
        [inputId]="item.value"
        (onChange)="onChanged($event)"
      ></p-checkbox>
      <label [for]="item.value">{{ item.label }}</label>
    </div>
  </ng-container>
<!-- ... -->
```

在 component 內：

```javascript
ngOnInit(): void {
  this.setValue();
}

setValue(): void {
  if (!this.control || !Array.isArray(this.control.value)) {
    return;
  }

  this.selectedItems = [...this.control.value];
}

onChanged(e: { checked: any[]; originalEvent: Event }): void {
  this.control?.setValue(e.checked);
}
```

### FormGroup 類型的自訂元件

或者，你也可以建立一個複雜的，使用 `FormGroup` 的輸入元件：

```javascript
formGroup = new FormGroup({
  control1: new FormControl(""),
  control2: new FormControl(""),
  control3: new FormControl(""),
});

// 將 `formGroup` 的值寫入 `control`
this.formGroup.valueChanges
  .pipe(
    debounceTime(0),
    tap((x) => this.control?.setValue(x))
  )
  .subscribe();

// 將 `FormGroup` 的狀態和 `control` 同步
this.control?.valueChanges
  .pipe(
    startWith(this.control.value),
    debounceTime(0),
    tap((x) => {
      // 避免觸發 `formGroup.valueChanges`，所以設定 emitEvent: false
      if (this.control?.disabled) this.formGroup.disable({ emitEvent: false });
      if (this.control?.enabled) this.formGroup.enable({ emitEvent: false });
    })
  )
  .subscribe();
```

### 用法

宣告一個變數，將你建立的自訂元件都放一起：

```javascript
customComponents = {
  "custom-input": MyCustomInputComponent,
};
```

然後將該變數傳入 `customComponents` 內:

```HTML
<ng-dynamic-json-form
  ...
  [customComponents]="customComponents"
></ng-dynamic-json-form>
```

接下來 `ng-dynamic-json-form` 就會自動從 JSON 資料內設定的 `customComponent` 欄位來尋找對應的元件：

```javascript
{
  "customComponent": "custom-input",
  ...
},
```
