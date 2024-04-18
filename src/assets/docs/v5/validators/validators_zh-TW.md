# 驗證器 (validators)

## Properties

```javascript
export interface ValidatorConfig {
  name: FormControlConditionType;
  value?: any;
  message?: string;
  flags?: string;
}
```

| Property | 說明                                                                    |
| :------- | :---------------------------------------------------------------------- |
| name     | 驗證器名稱。                                                            |
| value    | 驗證器的值。                                                            |
| message  | 驗證錯誤訊息。可使用 `{{value}}` 當 placeholder，來顯示當前控制器的值。 |
| flags    | `pattern` 驗證器的 flags。                                              |

> 除了 `email` 使用的是 `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/` 正則表達式，其餘的驗證器皆來自於 [Angular 內建的驗證器](https://angular.tw/api/forms/Validators)。

## 驗證器列表

| name                | value  |
| :------------------ | :----- |
| required            | -      |
| requiredTrue        | -      |
| min                 | number |
| max                 | number |
| minLength           | number |
| maxLength           | number |
| pattern             | string |
| email               | -      |
| ...自訂驗證器的 key | -      |

## 自訂驗證器

建立自訂的 `ValidatorFn`，然後將它們放到一個物件內並綁定到 `customValidators`。

### 使用 provider

```javascript
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';

{
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

### 使用 property binding

```javascript
validators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

```HTML
<ng-dynamic-json-form
 [configs]="..."
 [customValidators]="validators"
></ng-dynamic-json-form>
```

### 用法

將 `name` 設定為 `customValidators` 內目標驗證器的 key 值。

```json
{
  ...
  "validators": [
    ...
    {
      "name": "firstUppercase"
    }
  ]
}
```

## 例子

```json
{
  ...
  "validators": [
    {
      "name": "required",
      "message": "請輸入你的名字"
    },
    {
      "name": "minLength",
      "value": 4
    },
    {
      "name": "pattern",
      "value": "\\D+",
      "message": "存在不符合條件的字符: {{value}}"
    },
    {
      "name": "firstUppercase"
    }
  ]
}
```
