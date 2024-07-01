# UI 元件

當設定相應的 `type` 時，`uiComponents` 決定哪個元件會被使用。

## 提供 UI 元件

通過 `provideNgDynamicJsonForm` 來提供 `uiComponents`。目前有一些已製作好的 UI 元件，請參閱以下 [內建 UI 元件](#內建-ui-元件)。

```tsx
import { ApplicationConfig } from '@angular/core';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';

export const appConfig: ApplicationConfig = {
  providers: [
	  ...
    provideNgDynamicJsonForm({
	    ...
      uiComponents: UI_PRIMENG_COMPONENTS
    })
  ],
};
```

## 內建 UI 元件

[PrimeNg]: https://www.npmjs.com/package/primeng
[Angular Material]: https://www.npmjs.com/package/@angular/material

| 套件庫             | 常數名稱               | 路徑                             |
| ------------------ | ---------------------- | -------------------------------- |
| [PrimeNg]          | UI_PRIMENG_COMPONENTS  | ng-dynamic-json-form/ui-primeng  |
| [Angular Material] | UI_MATERIAL_COMPONENTS | ng-dynamic-json-form/ui-material |

## 建立自訂 UI 元件

建立自訂 UI 元件的過程和 [建立自訂元件](../../v8/custom-components/custom-components_zh-TW.md#建立自訂元件) 一樣。

## 擴充/覆寫 UI 元件

`uiComponents` 可以被覆寫或者擴充。舉個例子，我們將 `uiComponents` 多擴充一個 `file` 的類型。當 `type` 設為 `file` 時，`InputFileComponent` 元件就會被選用。

```tsx
import { ApplicationConfig } from '@angular/core';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { InputFileComponent } from '...';

export const appConfig: ApplicationConfig = {
  providers: [
	  ...
    provideNgDynamicJsonForm({
	    ...
      uiComponents: {
	      ...UI_PRIMENG_COMPONENTS,
	      file: InputFileComponent
      }
    })
  ],
};
```
