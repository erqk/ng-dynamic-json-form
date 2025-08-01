## 自訂 UI 元件

### 建立

和建立自訂元件一樣，你需要新增一個 component 並繼承 `NgDynamicJsonFormCustomComponent`。

當所有自訂的 UI 元件建立完成，將他們放入一個繼承 `UiComponents` 的常數。

```javascript
export const MY_UI_COMPONENTS: UiComponents = {
  text: { type: "custom", component: MyInputComponent },
  radio: { type: "custom", component: MyRadioComponent },
  checkbox: { type: "custom", component: MyCheckboxComponent },
  ...
};
```

> 繼承 `UiComponents` 可以很容易的知道目前所有的類型 (keys)。當然，也可以使用列表之外的 key，只要最終比對的上。

`UiComponents` 的屬性有:

| 屬性      | 說明                                                 |
| :-------- | :--------------------------------------------------- |
| type      | 用來表示此元件所使用的 UI 元件類型型。               |
| component | 繼承 `NgDynamicJsonFormCustomComponent` 的自訂元件。 |

可使用的 `type`：

| value    | description           |
| :------- | :-------------------- |
| basic    | 原生 HTML 元件        |
| primeng  | PrimeNg 元件          |
| material | Angular Material 元件 |
| custom   | 自訂的元件            |

### 用法

宣告一個變數來存放我們的自訂元件列表，然後傳入 template。

```javascript
myComponentList = MY_UI_COMPONENTS;
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="myComponentList"
></ng-dynamic-json-form>
```

### 從現有的常數引入

以下是使用 UI 套件製作好的常數：

| UI 套件          | 常數                   | 路徑                               |
| :--------------- | :--------------------- | :--------------------------------- |
| PrimeNg          | UI_PRIMENG_COMPONENTS  | `ng-dynamic-json-form/ui-primeng`  |
| Angular Material | UI_MATERIAL_COMPONENTS | `ng-dynamic-json-form/ui-material` |

> 要使用製作好的元件，你得先安裝相關的 UI 套件。

你可以直接引入製作好的常數，並綁定到 template。

```javascript
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

...
customUIComponentList = UI_PRIMENG_COMPONENTS; // UI_{{library}}_COMPONENTS
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="customUIComponentList"
></ng-dynamic-json-form>
```

因為 `UI_PRIMENG_COMPONENTS` 是一個常數, 代表你可以根據需求去擴展、覆蓋甚至和其他的 UI 套件合併使用 😊

```javascript
yourList = {
  ...UI_PRIMENG_COMPONENTS,
  ...MY_UI_COMPONENTS, // 擴展其他的 type
};
```
