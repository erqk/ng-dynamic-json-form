# Input Mask

Mask the input with specific pattern.
This feature is powered by [ngx-mask](https://www.npmjs.com/package/ngx-mask).

## Properties

[ngx-mask.config.ts]: https://github.com/JsDaddy/ngx-mask/blob/develop/projects/ngx-mask-lib/src/lib/ngx-mask.config.ts

It's the same with `IConfig` from [ngx-mask.config.ts].

```javascript
export interface NgxMaskConfig {
  mask: string;
  ...
}
```

## Example

[ngx-mask live docs]: https://jsdaddy.github.io/ngx-mask
[ngx-mask usage]: https://github.com/JsDaddy/ngx-mask/blob/develop/USAGE.md

When you provide `inputMask`, the input component with `mask` directive will be used.

> See [ngx-mask live docs], [ngx-mask usage].

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

> Remember to use escape character when you provide your regex string in JSON.
