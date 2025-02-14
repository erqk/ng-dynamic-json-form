# 驗證器

支援 Angular 內建的所有驗證器。

> `email` 驗證器使用的不是 `Validators.email` 而是 `Validators.pattern`: `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/`

## 驗證器設定

<doc-code>

```json
{
  ...
  "validators": [
    {
      "name": "...",
      "value": "...",
      "message": "..."
    }
  ],
  "asyncValidators": [
    // 同 "validators"
    ...
  ]
}
```

<doc-code>

### Properties

#### name

驗證器名稱。

#### value

若驗證器需要特定值來驗證，如 `min`, `max`，則需提供。

#### message

針對 Angular 的內建驗證器，設定自訂訊息。

## 加入驗證器

只需提供 `validators` 即可加入驗證器。

<doc-code>

```json
{
  "label": "Text",
  "formControlName": "text",
  "validators": [
    {
      "name": "required",
      "message": "請填寫此欄位！"
    }
  ]
}
```

</doc-code>

### 需要值的驗證器

一些驗證器像是 `min`、`max` 需要帶入值，這時候只需提供 `value` 即可。

<doc-code>

```json
{
  "label": "Text",
  "formControlName": "text",
  "type": "number",
  "validators": [
    {
      "name": "min",
      "message": "最小值不能小於 10",
      "value": 10
    }
  ]
}
```

</doc-code>

## 自訂驗證器

要使用自訂驗證器，先將驗證器加入 `provideNgDynamicJsonForm()` provider 內，然後，validators 設定的 `name` 需對應到 `customValidators` 的 key。

<doc-tab>

<doc-code name="app.config.ts">

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

export const appConfig: ApplicationConfig = {
  ...
  providers: [
    provideNgDynamicJsonForm({
      customValidators: {
        firstUppercase: firstUppercaseValidator,
      }
    }),
  ]
}
```

</doc-code>

<doc-code name="JSON">

```json
{
	...
	"validators": [
		{
			"name": "firstUppercase"
		}
	]
}
```

</doc-code>

</doc-tab>

## 自訂 Async 驗證器

使用方法與 [自訂驗證器](#自訂驗證器) 相同。

<doc-tab>

<doc-code name="app.config.ts">

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

export const appConfig: ApplicationConfig = {
  ...
  providers: [
    provideNgDynamicJsonForm({
      customAsyncValidators: {
        firstUppercase: firstUppercaseValidator,
      }
    }),
  ]
}
```

</doc-code>

<doc-code name="JSON">

```json
{
	...
	"asyncValidators": [
		{
			"name": "firstUppercase"
		}
	]
}
```

</doc-code>

</doc-tab>
