# 條件 (conditions)

設定特定條件下顯示輸入元件，或變更驗證器。例如：

- `A` 輸入框為隱藏狀態，直到 `B` 欄位已填寫或 `C` 的值為 X。
- 當 `A` 控制器的值為 N，則 `B` 控制器加入驗證器 X。

## Properties

```javascript
{
  "coditions": {
    [名稱]: {
      [群組運算子]: [
        [控制器路徑, 運算子, 目標值],
        ...
        {
          [群組運算子]: [...]
        }
      ]
    }
  }
}
```

<table>
  <thead>
    <th style="width: 20%">Property</th>
    <th style="width: 35%">值</th>
    <th>說明</th>
  </thead>
  <tbody>
    <tr>
      <td>名稱</td>
      <td>
        <code>hidden</code>,
        <code>requied</code>,
        <code>requiredTrue</code>,
        <code>min</code>,
        <code>max</code>,
        <code>minLength</code>,
        <code>maxLength</code>,
        <code>email</code>,
        <code>pattern</code>,
        <code>...自訂驗證器的 key</code>
      </td>
      <td>驗證器/狀態的切換。</td>
    </tr>
    <tr>
      <td>運算子</td>
      <td>
        <code>!==</code>,
        <code>===</code>,
        <code>></code>,
        <code><</code>,
        <code>>=</code>,
        <code><=</code>
      </td>
      <td>用來處理控制器的值和目標值的運算子。</td>
    </tr>
    <tr>
      <td>群組運算子</td>
      <td>
        <code>&&</code>,
        <code>||</code>
      </td>
      <td>運算子層用。若子層只有一個條件，使用上則無區別。</td>
    </tr>
    <tr>
      <td>控制器路徑</td>
      <td>string</td>
      <td>
        目標控制器在此表單上的路徑。如果是 FormArray，起始點為內部的 FormGroup。<br><br>
        如果控制器的值為物件，且需要比對該物件內某個欄位的值，請用 <code>,</code> 分隔符號來將控制器路徑和該欄位值的路徑串接。
      </td>
    </tr>
    <tr>
      <td>目標值</td>
      <td>any</td>
      <td>觸發條件的值。</td>
    </tr>
  </tbody>
</table>

## 例子

### 切換顯示狀態

```javascript
if (toggles.checkbox === false) {
  /** 隱藏此控制器 */
}
```

```json
{
  ...
  "conditions": {
    "hidden": {
      "&&": [
        ["toggles.checkbox", "===", false]
      ]
    }
  }
}
```

### 切換禁用狀態

```javascript
if (toggles.checkbox === false) {
  /** 禁用此控制器 */
}
```

```json
{
  ...
  "conditions": {
    "disabled": {
      "&&": [
        ["toggles.checkbox", "===", false]
      ]
    }
  }
}
```

### 切換驗證器

使用條件切換驗證器之前，請確認 `validators` 陣列內已設定需要切換的驗證器。

```javascript
if (toggles.checkbox === true || age > 20) {
  /** 加入 Validators.required 驗證器 */
}

if (toggles.switch === false) {
  /** 加入 firstUppercase 驗證器 */
}
```

```json
{
  ...
  "validators": [
    {
      "name": "required"
    },
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ],
  "conditions": {
    "required": {
      "||": [
        ["toggles.checkbox", "===", true],
        ["age", ">", 20]
      ]
    },
    "firstUppercase": {
      "&&": [
        ["toggles.switch", "===", false]
      ]
    }
  }
}
```

### 多重條件

```javascript
if (age > 20 && name === "王小明" && (toggles.checkbox === false || toggles.switch === false)) {
  /** 加入 Validators.required 驗證器 */
}
```

```json
{
  ...
  "conditions": {
    "required": {
      "&&": [
        ["age", ">", 20],
        ["name", "===", "王小明"],
        {
          "||": [
            ["toggles.checkbox", "===", false],
            ["toggles.switch", "===", false]
          ]
        }
      ]
    }
  }
}
```
