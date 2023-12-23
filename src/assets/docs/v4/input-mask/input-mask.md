# Input Mask

Mask the input with specific pattern.
This feature requires [`ngx-mask`](https://www.npmjs.com/package/ngx-mask) to be installed.

```javascript
// Same with IConfig interface, checkout the link below for more details.
export interface NgxMaskConfig {
  mask: string;
  ...
}
```

[IConfig interface](https://github.com/JsDaddy/ngx-mask/blob/develop/projects/ngx-mask-lib/src/lib/ngx-mask.config.ts)

[Ngx-Mask documentation ](https://github.com/JsDaddy/ngx-mask/blob/develop/USAGE.md)

When you set the property `ngxMaskConfig`, the input component with `mask` directive will be used.

```json
{
  ...,
  "ngxMaskConfig": {
    "patterns": {
      "0": {
        "pattern": "\\D+"
      }
    },
    ... // all the other options
  }
}
```
