# 選項 (options)

提供選擇的資料。通常用於 `radio`、`checkbox` 和 `select` 元件。當然，也可在自訂元件內使用。

## Properties

```javascript
export interface FormControlOptions {
  data?: OptionItem[];
  sourceList?: OptionSource[];
  sourceAppendPosition?: 'after' | 'before';
  trigger?: OptionTrigger;
  autoSelectFirst?: boolean;
  layout?: 'row' | 'column';
  labelPosition?: 'before' | 'after';
  containerClass?: string;
  containerStyles?: string;
}
```

| Property             | 說明                                                             |
| :------------------- | :--------------------------------------------------------------- |
| data                 | 靜態和動態資料的列表。請參閱 [OptionItem](#optionitem)。         |
| sourceList           | 動態資料設定。請參閱 [OptionSource](#optionsource)。             |
| sourceAppendPosition | 動態資料相對於靜態資料的位置。請參閱 [OptionItem](#optionitem)。 |
| trigger              | 請參閱 [OptionTrigger](#optiontrigger)。                         |
| autoSelectFirst      | 自動選擇第一個選項。                                             |
| layout               | Flex 佈局方向。 可用 `containerClass`，`containerStyles` 覆寫。  |
| labelPosition        | 選項文字顯示的位置。                                             |
| containerClass       | 選項容器的 `class`。                                             |
| containerStyles      | 選項容器的 `styles`。                                            |

## OptionItem

靜態資料的列表，同時也是動態資料成功載入完成之後，塞入的欄位。塞入的位置可由 `sourceAppendPosition` 決定。

### Properties

```javascript
export interface OptionItem {
  label: string;
  value?: any;
}
```

| Property | 說明     |
| :------- | :------- |
| label    | 選項文字 |
| value    | 選項值   |

### 二元複選框

`data` 只設定一個子物件，則可轉為二元複選框。可不提供 `value`。

```json
{
  ...
  "options": {
    "data": [
      {
        "label": "I'm a binary checkbox"
      }
    ]
  }
}
```

## OptionSource

從設定的 API 列表按照順序取得資料。

### Properties

```javascript
export interface OptionSource {
  src: string;
  method: "GET" | "POST";
  params?: { [key: string]: any };
  data: {
    labelKey: string,
    path?: string,
    valueKeys?: string[],
  };
  slice?: [number, number];
}
```

| Property | 說明                           |
| :------- | :----------------------------- |
| src      | API URL。                      |
| method   | `GET`, `POST`                  |
| params   | 請參閱 [請求參數](#請求參數)。 |
| data     | 請參閱 [資料轉換](#資料轉換)。 |
| slice    | 取得特定範圍的資料。           |

### 請求參數

```json
{
  ...
  "params": {
    "id": 1,
    "title": "string"
  }
}
```

`params` 預設只接受靜態值，並在發送請求的時候轉換為以下形態。

| 方法 | 形態                                    |
| :--- | :-------------------------------------- |
| GET  | `src`?id=1&title=string                 |
| POST | `payload: {"id": 1, "title": "string"}` |

動態的 `params` 只有同時設定了 `trigger` 才有用。請參閱 [OptionTrigger](#optiontrigger)。

### 資料轉換

將 API 取得的資料轉換為最終要使用的資料。

| Property       | 說明                                                 |
| :------------- | :--------------------------------------------------- |
| data.path      | API 回傳物件的資料所在路徑。(使用 `.` 分隔)          |
| data.labelKey  | 此 key 的值將作為選項文字。                          |
| data.valueKeys | 用以組合新的物件，作為選項的值。留空則使用完整物件。 |

### 例子

以下為建立商品的複選框的例子。

<br>

1. 表單設定：

```json
{
  ...
  "options": {
    "src": "https://dummyjson.com/products",
    "data": {
      "path": "products",
      "labelKey": "title",
      "valueKeys": ["id", "title", "price"]
    }
  }
}
```

<br>

2. HTTP 回傳資料：

```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
          "https://i.dummyjson.com/data/products/1/1.jpg",
          "https://i.dummyjson.com/data/products/1/2.jpg",
          "https://i.dummyjson.com/data/products/1/3.jpg",
          "https://i.dummyjson.com/data/products/1/4.jpg",
          "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    },
    ...
  ]
}
```

<br>

3. 最後，`title` 會作為複選框的文字，並且其值的內容為 `valueKeys` 所設定的 key。

<div style="display:grid; grid-template-columns:auto 1fr; gap:0.5rem; margin:2rem;">
  <input type="checkbox">
  <span>iPhone 9</span>
</div>

```javascript
[
  {
    id: 1,
    title: "iPhone 9",
    price: 549,
  },
  ...
];
```

> 如果 `valueKeys` 只有一個值, 那輸出的值就不是物件。
>
> ```javascript
> {
>   ...
>   "valueKeys": ["id"]
> }
> // Ouput: [1, 2, 3, ...]
> ```

## OptionTrigger

根據特定控制器的值，來過濾或者請求新的資料。

### Properties

```javascript
export interface OptionTrigger extends OptionSource {
  action: "FILTER" | "REQUEST";
  triggerValuePath: string;
  filterMatchPath?: string;
  debounceTime?: number;
}
```

| Property         | 說明                                     |
| :--------------- | :--------------------------------------- |
| ...OptionSource  | 請參閱 [OptionSource](#optionsource)。   |
| action           | 目標控制器的值變化之後，需要觸發的動作。 |
| triggerValuePath | 需要監聽的值的路徑。                     |
| filterMatchPath  | 此控制器用於過濾條件的欄位路徑。         |
| debounceTime     | 目標控制器 `valueChanges` 事件的防抖。   |

### 過濾資料

`formControlA` 的值：

```javascript
{
  formGroup: {
    formControlA: {
      value: {
        propertyA: ...,
        ...
      }
    },
  },
  ...
}
```

`formControlB` 的每一個選項的值：

```javascript
{
  data: {
    id: ...,
    ...
  }
}
```

要根據 `formControlA` 的值來過濾 `formControlB` 的選項資料，將 `triggerValuePath` 和 `filterMatchPath` 進行以下設定：

```json
{
  ...
  "formControlName": "formControlB",
  "options": {
    "trigger": {
      ...
      "action": "FILTER",
      "triggerValuePath": "formGroup.formControlA,value.propertyA",
      "filterMatchPath": "data.id"
    }
  }
}

```

> 若同時設定控制器路徑和值的路徑，請用 `,` 將它們分隔。

### 請求資料

> 這邊只說明使用 `GET` 的時候 `params` 是如何運作的，因為 `POST` 的情況下 `params` 會直接轉為 payload。

若有設定 `trigger`，`params` 內每一個 key 的值將會是目標控制器的值的路徑，然後 `params` 會變成請求的 URL 的一部分。

<br>

不同的 `src` 的形態會產生不同的請求 URL 類型。

| Src                    | 請求 URL                          |
| :--------------------- | :-------------------------------- |
| https://.../:id/:title | https://.../1/book                |
| https://.../book       | https://.../book?id=1&title=apple |

#### 值為原始類型

若控制器的值為原始類型，則使用空字串 `""` 來表示。

```javascript
// control.value
99;
```

```json
{
  ...
  "options": {
    "trigger": {
      ...
      "params": {
        "id": ""
      }
    }
  }
}
```

#### 值為物件

若控制器的值為物件，用 `.` 分隔符號來表達完整路徑。

```javascript
// control.value
{
  prop1: ...,
  prop2: {
    child1: ...,
    ...
  }
}
```

```json
{
  ...
  "options": {
    "trigger": {
      ...
      "params": {
        "id": "prop1",
        "title": "prop2.child1"
      }
    }
  }
}
```
