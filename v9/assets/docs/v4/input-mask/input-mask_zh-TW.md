# 輸入遮罩

將輸入的值根據條件進行遮罩處理。此功能由 [ngx-mask](https://www.npmjs.com/package/ngx-mask) 提供。

## Properties

[ngx-mask.config.ts]: https://github.com/JsDaddy/ngx-mask/blob/develop/projects/ngx-mask-lib/src/lib/ngx-mask.config.ts

和 [ngx-mask.config.ts] 內的 `IConfig` 一致。

```javascript
export interface NgxMaskConfig {
  mask: string;
  ...
}
```

## 例子

[ngx-mask 例子]: https://jsdaddy.github.io/ngx-mask
[ngx-mask 文件]: https://github.com/JsDaddy/ngx-mask/blob/develop/USAGE.md

設定 `inputMask`，則會使用已綁定 `mask` Directive 的輸入元件。

> 請參閱 [ngx-mask 例子], [ngx-mask 文件]

```json
{
  ...
  "inputMask": {
    "patterns": {
      "0": {
        "pattern": "\\D+"
      }
    },
    ...
  }
}
```

> 若在 JSON 內設定正則表達式，請記得使用跳脫字元。
