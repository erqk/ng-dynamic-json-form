# 樣式

## CSS 變數

以下為已設定好的 CSS 變數，方便覆寫。

| Variable                          | Default | Description                         |
| :-------------------------------- | :------ | :---------------------------------- |
| --color-primary                   | #3b82f6 | 預設 UI 的主題色。                  |
| --color-error                     | gray    | 錯誤訊息的文字顏色。                |
| --color-border                    | #ff4747 | 輸入框的顏色。                      |
| --font-family                     | gray    | 表單內使用的 font-family。          |
| --font-size-title                 | 1.2em   | FormArray, FormGroup 的標題大小。   |
| --font-size-label                 | 1em     | 輸入欄位標題大小。                  |
| --font-size-description           | 0.925em | 描述文字大小。                      |
| --font-size-error                 | 0.925em | 錯誤訊息文字大小。                  |
| --font-weight-title               | 700     | FormGroup，FormArray 標題文字粗細。 |
| --font-weight-label               | 500     | 輸入欄位標題粗細。                  |
| --input-border-width              | 1px     | 輸入框的寬度。                      |
| --column-gap                      | 1em     | 輸入欄位之間的水平間距。            |
| --row-gap                         | 1.5em   | 輸入欄位之間的垂直間距。            |
| --options-column-gap              | 1.85em  | 選項的水平間距。                    |
| --options-row-gap                 | 0.25em  | 選項的垂直間距。                    |
| --form-array-item-divider-color   | #e1e1e1 | FormArray 的分隔線顏色。            |
| --form-array-item-divider-weight  | 1px     | FormArray 的分隔線粗細。            |
| --form-array-item-divider-spacing | 2em     | FormArray 的分隔線空白大小。        |

## 佈局

可利用 class 或直接設定 style 來對欄位進行樣式和佈局調整。

```javascript
export interface FormLayout {
  hostClass?: string;
  hostStyles?: string;
  labelClass?: string;
  labelStyles?: string;
  contentClass?: string;
  contentStyles?: string;
  descriptionClass?: string;
  descriptionStyles?: string;
  descriptionPosition?: "before" | "after";
  hideValidationMessage?: boolean;
  hideLabel?: boolean;
  contentCollapsible?: "collapse" | "expand";
}
```

### Properties

| Property              | 描述                                      |
| :-------------------- | :---------------------------------------- |
| hostClass             | 請參閱 [Class & styles](#class--styles)。 |
| hostStyles            | 請參閱 [Class & styles](#class--styles)。 |
| labelClass            | 請參閱 [Class & styles](#class--styles)。 |
| labelStyles           | 請參閱 [Class & styles](#class--styles)。 |
| contentClass          | 請參閱 [Class & styles](#class--styles)。 |
| contentStyles         | 請參閱 [Class & styles](#class--styles)。 |
| descriptionClass      | 請參閱 [Class & styles](#class--styles)。 |
| descriptionStyles     | 請參閱 [Class & styles](#class--styles)。 |
| descriptionPosition   | 相對於輸入元件的位置。                    |
| hideValidationMessage | 隱藏此控制器的錯誤訊息。                  |
| hideLabel             | 隱藏此控制器的標題。                      |
| contentCollapsible    | 請參閱 [內容展開/收合](#內容展開收合).    |

## Class & styles

使用 class 或 inline style，對控制器的各個區塊調設定 CSS 樣式。可設定的區塊有 `host`、`label`、`content` 和 `description`。

<br>

<div class="docs-control-layout">
  <div class="label">label</div>
  <div class="content">
    <div class="description">description</div>
    <input type="text">
    <div class="errors">Error messages</div>
  </div>
</div>

## 使用自訂元件和模板

`layoutComponents`, `layoutTemplates` 提供以下 property，可使用自訂的元件或模板來替代預設的 UI。

| Property            | 說明                                                  |
| :------------------ | :---------------------------------------------------- |
| errorMessage        | 請參閱 [自訂錯誤訊息](#自訂錯誤訊息).                 |
| loading             | 請參閱 [自訂 loading](#自訂-loading).                 |
| formArrayItemHeader | 請參閱 [FormArray 子表單標題](#formarray-子表單標題). |

可選擇使用 provider 或者 property binding 的方式將相關元件/模板進行綁定。

```javascript
...
providers: [
  provideNgDynamicJsonForm({
    layoutComponents: {
      errorMessage: ...,
      loading: ...,
      formArrayItemHeader: ...,
    },
  }),
],
```

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutComponents]="{
    errorMessage: ...,
    loading: ...,
    formArrayItemHeader: ...
  }"
  [layoutTemplates]="{
    [key: string]: ...,
    ...
  }"
></ng-dynamic-json-form>
```

## 自訂錯誤訊息

表單內所有錯誤訊息的模板。

<table>
  <thead>
    <tr>
      <th style="width: 50%">預設</th>
      <th style="width: 50%">自訂</th>
    <tr>
  </thead>

  <tbody>
    <tr>
      <td style="vertical-align: top">
        <custom-error-message></custom-error-message>
      </td>
      <td style="vertical-align: top">
        <custom-error-message custom-error="true"></custom-error-message>
      </td>
    </tr>
  </tbody>
</table>

> 要調整特定控制器的錯誤訊息，設定 `layout.hideValidationMessage` 為 `true`，並使用 `customComponent`。這樣一來就可以在元件內自行加入判定控制錯誤訊息的顯示。請參閱 [自訂元件](../../v5/custom-components/custom-components_zh-TW.md).

### 使用元件

建立一個繼承 `ErrorMessageComponent` 的元件，並傳入 `layoutComponents` 內的 `errorMessage`。

```javascript
export class CustomErrorMessageComponent extends ErrorMessageComponent {}
```

```html
<ng-container *ngFor="let item of errorsMessages">
  <div class="flex items-start gap-2 text-rose-600 text-sm">
    <i class="bi bi-exclamation-triangle"></i>
    <span>{{ item }}</span>
  </div>
</ng-container>
```

### 使用 &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    errorMessage: errorTemplate
  }"
>
  <ng-template #errorTemplate let-control="control" let-messages="messages">
    <ng-container *ngFor="let item of messages">
      <div>{{ item }}</div>
    </ng-container>
  </ng-template>
</ng-dynamic-json-form>
```

## 自訂 loading

當動態資料載入的時會顯示的 UI。

<table>
  <thead>
    <tr>
      <th style="width: 50%">預設</th>
      <th style="width: 50%">自訂</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <select style="margin: 0 0.25rem; width: calc(100% - 0.5rem); filter: grayscale(1); opacity: 0.5; pointer-events: none;">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </td>
      <td>
        <custom-loading></custom-loading> 
      </td>
    </tr>
  </tbody>
</table>

### 使用元件

將元件傳入 `layoutComponents` 內的 `loading`。

### 使用 &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    loading: loadingTemplate
  }"
>
  <ng-template #loadingTemplate>
    <div>載入中...</div>
  </ng-template>
</ng-dynamic-json-form>
```

## FormArray 子表單標題

### Properties

可用於建立自訂標題的 property 列表。

| Property     | 說明                                                                      |
| :----------- | :------------------------------------------------------------------------ |
| config       | 表單陣列設定。請參閱 [表單陣列](../../v5/form-array/form-array_zh-TW.md). |
| index        | FormArray 內子表單的索引值。                                              |
| formArray    | FormArray 本身。                                                          |
| templateForm | FormArray 內的子表單。                                                    |
| buttonEvent  | 提供 `add`, `remove` 方法來新增、刪除子表單。                             |

### 使用元件

建立一個繼承 `FormArrayItemHeaderComponent` 的元件，然後傳入 `layoutComponents` 內的 `formArrayItemHeader`。

```javascript
export class CustomHeaderComponent extends FormArrayItemHeaderComponent {}
```

```html
<div class="flex justify-between">
  <span>{{ config?.templateLabel }} {{ index }}</span>
  <div class="flex gap-4">
    <button (click)="buttonEvent.add()">ADD</button>
    <button (click)="buttonEvent.remove()">REMOVE</button>
  </div>
</div>
```

### 使用 &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    formArrayItemHeader: headerTemplate
  }"
>
  <ng-template #headerTemplate let-config="config" let-buttonEvent="buttonEvent">
    <div class="my-custom-group-header">
      <span>{{ config.templateLabel }}</span>
      <button type="button" (click)="buttonEvent.add()">+</button>
      <button type="button" (click)="buttonEvent.remove()">-</button>
    </div>
  </ng-template>
</ng-dynamic-json-form>
```

## 內容展開/收合

針對控制器的標題，加入展開/收合內容的功能。`label` 不可為空。

```json
{
  ...
  "label": "Label",
  "layout": {
    "contentCollapsible": "collapse"
  }
}
```

| 值       | 說明             |
| :------- | :--------------- |
| collapse | 預設為收合狀態。 |
| expand   | 預設為展開狀態。 |

### Properties

可用於建立自訂標題的 property 列表。

| Property    | 說明                          |
| :---------- | :---------------------------- |
| label       | 控制器的標題.                 |
| toggle      | 觸發展開、收合的方法。        |
| collapsible | `contentCollapsible` 不為空。 |
| expand      | 當前展開/收合布林狀態。       |

### 使用元件

建立一個繼承 `FormTitleComponent` 的元件，然後傳入 `layoutComponents` 的 `formTitle`。

```javascript
export class CustomFormTitleComponent extends FormTitleComponent {}
```

```html
<button type="button" (click)="toggle()">
  <span>{{ label }}</span>
  ...
</button>
```

### 使用 &lt;ng-template&gt;

```html
<ng-dynamic-json-form
  [configs]="..."
  [layoutTemplates]="{
    formTitle: titleTemplate
  }"
>
  <ng-template #titleTemplate let-label="label" let-toggle="toggle">
    <button type="button" class="custom-form-title" (click)="toggle()">
      <span>{{ label }}</span>
      ...
    </button>
  </ng-template>
</ng-dynamic-json-form>
```
