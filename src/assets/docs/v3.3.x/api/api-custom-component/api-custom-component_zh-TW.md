## 自訂元件

### 建立

建立一個元件並繼承 `NgDynamicJsonFormCustomComponent`。此元件內擁有必要的屬性以讓元件成功運作。

```javascript
export class NgDynamicJsonFormCustomComponent {
  public control: UntypedFormControl | null = null;
  public data: FormControlConfig | null = null;
  public viewControl?: AbstractControl;
  public errors$?: Observable<string[]>;

  readControlValue(obj: any): void {}
  writeControlValue(fn: any): void {}
  controlDisabled(isDisabled: boolean): void {}
  controlTouched(isTouched: boolean): void {}
}
```

```javascript
...
export class MyCustomComponent extends NgDynamicJsonFormCustomComponent {}
...
```

#### 屬性

| 屬性        | 說明                                                    |
| :---------- | :------------------------------------------------------ |
| control     | 此為跟父層表單溝通的主要 `FormControl。`                |
| data        | 此元件的設定參數。                                      |
| viewControl | 用來建立和主要 `FormControl` 不同的 `AbstractControl`。 |
| errors$     | 此元件的 `FormControl` 錯誤訊息。                       |

<br>

#### 方法

這些方法的用法和實做 `ControlValueAccessor` 之後的用法一致。查看 <a href="https://angular.tw/api/forms/ControlValueAccessor" target="_blank">Angular 文件</a>.

| method            | description                                      |
| :---------------- | :----------------------------------------------- |
| readControlValue  | 同 ControlValueAccessor 的 `writeValue`。        |
| writeControlValue | 同 ControlValueAccessor 的 `registerOnChange`。  |
| controlDisabled   | 同 ControlValueAccessor 的 `setDisabledState`。  |
| controlTouched    | 同 ControlValueAccessor 的 `registerOnTouched`。 |

> **重要:** 以上所有方法都必須在 `ngOnInit()` 執行. 所以當你覆寫 `ngOnInit()` 時請務必呼叫 `super.ngOnInit()`。

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
...
override ngOnInit(): void {
  super.ngOnInit();
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
...
```

### FormGroup 類型的自訂元件

或者，你也可以建立一個使用 `FormGroup` 的元件，這種情況就可以使用 `viewControl` 來讓事情變簡單。當此 `FormGroup` 的值更新時，此元件主要的 `FormControl` 也會一併更新。

```javascript
...
override viewControl = new FormGroup({
  control1: new FormControl(''),
  control2: new FormControl(''),
  control3: new FormControl(''),
});
```

### 自訂日期選擇器

當元件的表單形式和主要的 `FormControl` 不一樣時，可以通過覆寫元件提供的方法來簡化我們的程式碼。就像實做 `ControlValueAccessor` 的時候一樣：

```javascript
...
public override viewControl = new FormGroup({
  date: new FormControl(''),
  time: new FormControl(''),
});

override readControlValue(obj: any): void {
  if (!obj) return;

  const dateRaw = formatDate(obj, 'yyyy-MM-dd,HH:mm:ss', this.locale);
  this.viewControl.patchValue({
    date: dateRaw.split(',')[0],
    time: dateRaw.split(',')[1],
  });
}

override writeControlValue(fn: any): void {
  this.viewControl.valueChanges
    .pipe(
      filter((x) => !!x.date && !!x.time),
      map(() => this.dateTimeFormatted)
    )
    .subscribe(fn);
}
...
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
