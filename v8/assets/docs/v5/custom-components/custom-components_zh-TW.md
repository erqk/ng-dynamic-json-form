# 自訂元件

## 建立元件

[ControlValueAccessor]: https://angular.tw/api/forms/ControlValueAccessor
[FormControlConfig]: ../../v5/form-control-config/form-control-config_zh-TW.md
[Validator]: https://angular.tw/api/forms/Validator

建立一個繼承 `CustomControlComponent` 的元件，此元件含有 [ControlValueAccessor] 和 [Validator] 一模一樣的方法提供使用。

> 不需要在 provider 特別注入 `NG_VALUE_ACCESSOR` 和 `NG_VALIDATORS`，已交由底層處理。

### Properties

可用於建立自訂元件的 property 列表。

| Property      | 類型                | 說明                                       |
| :------------ | :------------------ | :----------------------------------------- |
| control       | `AbstractControl`   | 此元件的控制器。必須 override 並建立實體。 |
| data          | [FormControlConfig] | 此元件的設定。                             |
| errorMessages | `string[]`          | 此控制器的錯誤訊息陣列。                   |

### 方法

#### onOptionsGet

動態資料取得之後觸發的事件。

```javascript
onOptionsGet(data: OptionItem[]): void {
  ...
}
```

### 例子

```javascript
export class UiBasicDateComponent extends CustomControlComponent {

  // 可 override 為 FormControl, FormGroup 或者 FormArray。
  override control = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
  });

  // 轉換寫入的資料
  override writeValue(obj: any): void {
    ...
    this.control.patchValue({
      date: ...,
      time: ...,
    });
  }

  // 轉換輸出的資料
  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(
        filter((x) => !!x.date && !!x.time),
        map(() => ...)
      )
      .subscribe(fn);
  }
}
```

## 用法

### 使用元件

使用 provider 或者 property binding 的方式將元件綁定到 `customComponents`。

#### 使用 provider

```javascript
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

{
  ...
  providers: [
    provideNgDynamicJsonForm({
      customComponents: {
        compA: CustomComponentA,
        compB: CustomComponentB,
      },
    }),
  ]
}
```

#### 使用 property binding

```javascript
import { CustomComponents } from 'ng-dynamic-json-form';

components: CustomComponents = {
  compA: CustomComponentA,
  compB: CustomComponentB,
  ...
}
```

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [customComponents]="components"
></ng-dynamic-json-form>
```

#### 表單設定

將 `customComponent` 設定為目標自訂元件的 key。

```json
[
  {
    ...
    "customComponent": "compA"
  },
  {
    ...
    "customComponent": "compB"
  }
]
```

### 使用 &lt;ng-template&gt;

只支援使用 `FormControl` 控制器的元件。Template 所提供的變數和 `CustomControlComponent` 的 property 一致。

```html
<ng-dynamic-json-form
  [configs]="..."
  [inputTemplates]="{
    compA: compATemplate,
    compB: compBTemplate
  }"
>
  <ng-template #compATemplate let-control="control">
    ...
    <input type="text" [formControl]="control" />
  </ng-template>

  <ng-template #compBTemplate let-control="control">
    ...
    <input type="text" [formControl]="control" />
  </ng-template>
</ng-dynamic-json-form>
```

## 自訂 UI 元件

### 現成的 UI 元件

此列表提供可立即使用的 UI 元件。

[PrimeNg]: https://www.npmjs.com/package/primeng
[Angular Material]: https://www.npmjs.com/package/@angular/material

| UI 元件庫          | 常數                   | 路徑                             |
| :----------------- | :--------------------- | -------------------------------- |
| [PrimeNg]          | UI_PRIMENG_COMPONENTS  | ng-dynamic-json-form/ui-primeng  |
| [Angular Material] | UI_MATERIAL_COMPONENTS | ng-dynamic-json-form/ui-material |

> 相關 UI 元件庫必須先安裝，才能使用。

<br>

選擇其中一個，並使用 provider 或 property binding 的方式將其綁定到 `uiComponents`。

#### 使用 provider

```javascript
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

{
  ...
  providers: [
    provideNgDynamicJsonForm({
      uiComponents: UI_PRIMENG_COMPONENTS
    }),
  ]
}
```

#### 使用 property binding

```javascript
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

uiComponents = UI_PRIMENG_COMPONENTS;
```

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [uiComponents]="uiComponents"
></ng-dynamic-json-form>
```

### 建立自訂 UI 元件

與自訂元件相似，建立一個繼承 `CustomControlComponent` 的元件。

> 可以建立一個全新的 UI 元件列表，或者從現有的元件列表擴充。

<br>

例如, 建立一個 `HTMLEditorComponent`，然後設定 key 為 `htmlEditor`。

```javascript
import { UiComponents } from "ng-dynamic-json-form";
import { HTMLEditorComponent } from "src/app/features/html-editor/html-editor.component.ts";

myUiComponents: UiComponents = {
  ...UI_PRIMENG_COMPONENTS,
  htmlEditor: HTMLEditorComponent,
};
```

然後將 `type` 設定為 `htmlEditor`，則會使用剛剛建立的 `HTMLEditorComponent` 元件。

```json
{
  ...
  "type": "htmlEditor"
}
```
