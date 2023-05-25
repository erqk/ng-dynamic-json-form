# 開始

## 安裝

從 npm 安裝 `ng-dynamic-json-form`:

```
npm i ng-dynamic-json-form
```

接下來, 將 `NgDynamicJsonFormComponent` 導入到 `NgModule`.

```javascript
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';

@NgModule({
  ...,
  imports: [
    ...,
    NgDynamicJsonFormComponent,
  ],
  ...
})
```

最後，將樣式檔加入 `angular.json`:

```javascript
//...
  "styles": [
    "node_modules/ng-dynamic-json-form/lib/styles/styles.scss",
    //...
  ],
//...
```

## 基本用法

選擇以下其中一種方式提供你的設定資料：
1. `FormControlConfig[]`
2. `FormControlConfig[]` 的 JSON 字串

然後，將設定資料傳入 `jsonData`。

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
}

console.log(this.form?.value);
// {
//   "name": "Default Name",
//   "email": ""
// }

console.log(this.form?.status);
// INVALID
```

使用 `form.errors`，可以取得表單內所有 `AbstractControl` 的錯誤訊息。

```json
{
  "basicInfo": {
    "age": {
      "min": {
        "min": 18,
        "actual": "1"
      }
    }
  },
  "email": {
    "email": "Invalid email format"
  }
}
```

## 進階用法

對於更複雜的表單，你可以加入自定驗證器、自定元件來完成更複雜的需求。更多說明請轉到 **API** 頁面。

```javascript
/**
 * The `key` will be use to match with `value` of validator named "custom":
 * @example
 * {
 *  //...
 *  "validators": [
 *    { "name": "custom", "value": "..." }
 *  ]
 * }
 */
customValidators = {
  [key: string]: ValidatorFn
};

/**
 * The `key` will be use to match with `customComponent`:
 * @example
 * {
 *  //...
 *  "customComponent": "..."
 * }
 */
customComponents = {
  [key: string]: Type<NgDynamicJsonFormCustomComponent>
}
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
- Angular Material

請到 **API** 內的 **自定 UI 元件** 查看更多。
