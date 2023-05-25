## 輸入遮罩

> 須安裝 ngx-mask 以使用此功能

只需設定 `ngxMaskConfig`，會自動使用帶遮罩的輸入元件。

```javascript
{
  "ngxMaskConfig": {
    "mask": "",
    //...Partial<IConfig> (完整參數列表請參考 ngx-mask 文件)
  }
}
```

如果你傳入 `jsonData` 的值是 JSON 字串，你會發現 `pattern` 的型別爲 `RegExp`，這不是合法的 JSON 值。

```javascript
patterns: {
  [character: string]: {
    pattern: RegExp;
    optional?: boolean;
    symbol?: string;
  };
}
```

因此你只需要傳入正則表達式字串:

```javascript
{
  "patterns": {
    "0": {
      "pattern": "\\D+"
    };
  }
}
```
