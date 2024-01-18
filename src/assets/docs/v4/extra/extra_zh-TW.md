# 額外資料 (extra)

可傳入額外的資料，來設定元件的控制項目。會將傳入的 property 自動和目標元件、directive 或 HTML 元素進行綁定。也可以傳入其他任意的參數，方便自訂元件使用。

> 自動綁定對於自訂 UI 元件不適用。因為對於自訂元件，我們有完整的控制權，可自行手動綁定 property。

## 綁定目標

以下為各個 `type` 所自動綁定的目標。

### Angular Material

| Type      | 目標                | 選擇器                          |
| :-------- | :------------------ | :------------------------------ |
| checkbox  | MatCheckbox         | `<mat-checkbox>`                |
| date      | MatDatepickerInput  | `input[matDatepicker]`          |
| input     | MatInput            | `input[matInput]`               |
| inputMask | MatInput            | `input[matInput]`               |
| radio     | MatRadioGroup       | `<mat-radio-group>`             |
| range     | MatSlider           | `<mat-slider>`                  |
| select    | MatSelect           | `<mat-select>`                  |
| switch    | MatSlideToggle      | `<mat-slide-toggle>`            |
| textarea  | CdkTextareaAutosize | `textarea[cdkTextareaAutosize]` |

### PrimeNg

| Type      | 目標          | 選擇器                     |
| :-------- | :------------ | :------------------------- |
| checkbox  | Checkbox      | `<p-checkbox>`             |
| date      | Calendar      | `<p-calendar>`             |
| input     | InputText     | `input[pInputText]`        |
| inputMask | InputText     | `input[pInputText]`        |
| radio     | RadioButton   | `<p-radioButton>`          |
| range     | Slider        | `<p-slider>`               |
| select    | Dropdown      | `<p-dropdown>`             |
| switch    | InputSwitch   | `<p-inputSwitch>`          |
| textarea  | InputTextarea | `textarea[pInputTextarea]` |

## 例子

以下設定：

```json
{
  ...
  "type": "date",
  "extra": {
    "showIcon": true,
    "iconDisplay": "input"
  }
}
```

...和手動綁定有同樣的效果：

```html
<p-calendar ... [iconDisplay]="'input'" [showIcon]="true"></p-calendar>
```
