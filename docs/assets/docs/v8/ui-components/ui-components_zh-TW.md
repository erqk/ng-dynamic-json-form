# UI 元件

UI 元件和自訂元件是一樣的。它們都繼承 `CustomControlComponent`。

`NgDynamicJsonForm` 會根據設定的 `type` 來找對應的元件來使用。

```json
configs = [
	{
		...
		"type": "checkbox"
	},
	...
]
```

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

## 自訂 UI 元件

建立自訂 UI 元件的過程和 [自訂元件](../../v8/custom-components/custom-components_zh-TW.md) 一樣。

`uiComponents` 可以被擴充、覆寫。舉個例子，我們可以將 `InputFileComponent` 加入到 `uiComponents`。當 `type` 設為 `file` 時，該元件就會自動被選用。

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

```json
{
  "formControlName": "file",
  "label": "File upload",
  "type": "file"
}
```
