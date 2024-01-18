## Input mask

> This feature requires ngx-mask to be installed.

When you set `ngxMaskConfig`, the text input component with `mask` directive will be used.

```javascript
{
  "ngxMaskConfig": {
    "mask": "",
    //...Partial<IConfig> (Please refer to ngx-mask docs for all configs)
  }
}
```

If you pass JSON string into `jsonData`, you may notice the property `pattern` only accepts type `RegExp`, which is not allowed in a valid JSON.

```javascript
patterns: {
  [character: string]: {
    pattern: RegExp;
    optional?: boolean;
    symbol?: string;
  };
}
```

So in order to make your custom `pattern` works, pass only regex string:

```javascript
{
  "patterns": {
    "0": {
      "pattern": "\\D+"
    };
  }
}
```
