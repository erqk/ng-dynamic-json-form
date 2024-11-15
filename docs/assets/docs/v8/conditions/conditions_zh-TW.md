# 條件

使用條件可處理一下情況：

- 切換欄位的驗證器
- 切換欄位的顯示
- 切換欄位的禁用狀態
- 執行自訂動作

以下例子顯示，當 checkbox 取消勾選之後，則隱藏 input。

<doc-form-viewer config-path="CONDITIONS_VISIBILITY.ZH-TW"></doc-form-viewer>

## 語法

`conditions` 由 `NAME`、`GROUP_OPERATOR` 和一個 tupple `[CONTROL_PATH, OPERATOR, VALUE]` 組成。

```ts
{
    ...
    "conditions": {
      NAME: {
        GROUP_OPERATOR: [
          [CONTROL_PATH, OPERATOR, VALUE]
        ]
      }
    }
  }
```

### NAME

以下為可用的 `NAME` 列表。

#### 內建驗證器

- `validator.required`
- `validator.requiredTrue`
- `validator.min`
- `validator.max`
- `validator.minLength`
- `validator.maxLength`
- `validator.email`
- `validator.pattern`

#### 控制器狀態

- `control.disabled`
- `control.hidden`

#### 自訂驗證器

- `validators.` + `name`

#### 自訂動作

- `conditionsActionFuntions` 內對應的 key 字串

### GROUP_OPERATOR

`&&`, `||`

每一個 `conditions` 的 key 都必須含有至少一個 GROUP_OPERATOR。可接受 tupple 或巢狀 GROUP_OPERATOR。

> `&&` or `||` 只需則一，若同時提供，只有 `&&` 會被使用。

### LEFT, OPERATOR, RIGHT

Tupple `[LEFT, OPERATOR, RIGHT]` 的作用是作為 `if` 表達式：

```tsx
// ["controlA", "===", "foo"]
if (controlA.value === "foo") {...}

// ["controlA,prop1", "===", "foo"]
if (controlA.value.prop1 === "foo") {...}

// ["groupA.controlA", "===", "foo"]
if (groupA.controls.controlA.value === "foo") {...}

// ["bar", "!==", "controlB"]
if (controlB.value !== "bar") {...}
```

可使用的 `OPERATOR`：

- `===`
- `!==`
- `>=`
- `<=`
- `>`
- `<`
- `includes`
- `notIncludes`

## 執行自訂動作

將 key 和對應的 function 傳入 `conditionsActionFuntions`。當條件達成，相對於的 function 就會自動被執行。

<doc-tab>

<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="configs"
  [conditionsActionFuntions]="customActions"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```jsx
configs = [
  {
    ...
    "conditions": {
      "doA": {
        "&&": [...]
      },
      "doB": {
        "&&": [...]
      }
    }
  }
];

customActions = {
  doA: () => this._actionA(),
  doB: (c?: AbstractControl) => this._actionB(c)
}

private _actionA(): void {
  ...
}

// 此 control 是條件達成後，會對其進行操作的 control。
private _actionB(c?: AbstractControl): void {
  ...
}
```

</doc-code>

</doc-tab>

## 例子

### 切換顯示狀態

<doc-form-viewer config-path="CONDITIONS_VISIBILITY.ZH-TW"></doc-form-viewer>

### 切換驗證器

若要切換驗證器，該驗證器必須存在於 `validators` 陣列內。

<doc-form-viewer config-path="CONDITIONS_VALIDATOR.ZH-TW"></doc-form-viewer>

### 多個條件

<doc-form-viewer config-path="CONDITIONS_MULTIPLE.ZH-TW"></doc-form-viewer>
