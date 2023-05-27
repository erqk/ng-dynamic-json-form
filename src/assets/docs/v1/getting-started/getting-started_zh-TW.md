# 開始

## 安裝

從 npm 安裝 `ng-dynamic-json-form`:

```
npm i ng-dynamic-json-form
```

接下來, 將 `NgDynamicJsonFormModule` 導入到目標 `NgModule`.

```javascript
import { NgDynamicJsonFormModule } from 'ng-dynamic-json-form';

...
@NgModule({
  ...
  imports: [
    NgDynamicJsonFormModule,
    ...
  ],
  ...
})
```

最後，將樣式檔加入 `angular.json`:

```javascript
{
  ...
  "styles": [
    "node_modules/ng-dynamic-json-form/lib/styles/styles.scss",
    ...
  ],
  ...
}
```

## 基本用法

將 `FormControlConfig[]` 型別的資料傳入 `jsonData`。

> 表單將在資料傳入後馬上生成

```html
<!-- prettier-ignore -->
<ng-dynamic-json-form
  [jsonData]="jsonData"
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

```javascript
jsonData: FormControlConfig[] = [
  {
    label: 'Name',
    formControlName: 'name',
    value: 'Default Name',
    type: 'text',
    validators: [
      {
        name: 'required'
      }
    ],
  },
  {
    label: 'Email',
    formControlName: 'email',
    type: 'email',
    validators: [
      {
        name: 'required'
      },
      {
        name: 'email'
      }
    ],
  }
]
```

接下來，綁定 Output 事件 `formGet`，即可取得生成的 `ReactiveForm`。

```javascript
onFormGet(e: UntypedFormGroup): void {
  this.form = e;

  console.log(this.form?.value);
  // {
  //   "name": "Default Name",
  //   "email": ""
  // }

  console.log(this.form?.status);
  // INVALID
}
```

使用 `form.errors`，可以取得表單內所有 `AbstractControl` 的錯誤訊息。

```json
{
  "age": {
    "min": {
      "min": 18,
      "actual": "1"
    }
  },
  "email": {
    "required": true
  }
}
```

## 進階用法

對於更複雜的表單，你可以加入自訂驗證器、自訂元件來完成更複雜的需求。另外，你也可以通過設定 `conditions` 來將某個 `AbstractControl` 的狀態/驗證器綁定到另一個 `AbstractControl` 的值。更多說明請轉到 **API** 頁面。

```javascript
jsonData: FormControlConfig[] = [
  {
    validators: [
      {
        name: "required"
      },
      // 此為自訂驗證器，`value` 的值是用來尋找 `customValidators` 內符合的驗證器
      {
        name: "custom",
        value: "firstUppercase"
      }
    ],
    // 當 `age` AbstractControl 的值大於 20 的時候，此 AbstractControl 為必填
    conditions: [
      {
        name: "required",
        control: "age",
        controlValue: 20,
        operator: ">"
      }
    ],
    ...
  },
  ...
]
```

```html
<!-- prettier-ignore -->
<ng-dynamic-json-form
  [jsonData]="jsonData"
  [customValidators]="customValidators"
  [customComponents]="customComponents"
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

## 第三方 UI 套件

`ng-dynamic-json-form` 允許表單使用第三方 UI 套件的輸入元件。你可以直接套用已製作好的常數或自己製作一個，甚至可以在一個表單內使用不同的 UI 套件！🎉

以下第三方 UI 套件已有製作好的 UI 元件：

- PrimeNg

> 目前僅有一個套件，其他的 UI 套件會陸續加入

請到 **API** 內的 **自訂 UI 元件** 查看更多。
