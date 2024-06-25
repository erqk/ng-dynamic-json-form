# 驗證器

支援 Angular 內建的所有驗證器。

> `email` 驗證器使用的不是 `Validators.email` 而是 `Validators.pattern`: `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/`

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

有寫驗證器像是 `min`、`max` 需要帶入值，這時候只需提供 `value` 即可。

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

要使用自訂驗證器，`name` 欄位的值必須要對應得到 `customValidators` 內的 key。

<doc-tab>
<doc-code name="Config">

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
<doc-code name="TS">

```ts
...
@Component({...})
export class YourComponent {
  validators = {
    firstUppercase: firstUppercaseValidator,
  };
}
```

</doc-code>
<doc-code name="HTML">

```html
<ng-dynamic-json-form ... [customValidators]="validators"></ng-dynamic-json-form>
```

</doc-code>
</doc-tab>

### 全域自訂驗證器

`provideNgDynamicJsonForm()` 內注入的自訂驗證器為全域可用。

<doc-code>

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
