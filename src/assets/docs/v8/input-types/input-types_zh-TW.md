# 輸入類型

以下為內建的輸入類型列表。將 `type` 設為以下其中一個值來建立該類型的輸入欄位。

- [checkbox](#checkbox)
- [date](#date)
- [number](#number)
- [password](#password)
- [radio](#radio)
- [range](#range)
- [select](#select)
- [switch](#switch)
- [text](#text)
- [textarea](#textarea)

> 若無提供類型，預設將使用 `text`。

---

## Text

<doc-form-viewer config-path="TEXT.ZH-TW"></doc-form-viewer>

---

## Number

`type` 設為 `number` 將會使用 `type="number"` 的 input。我們也可以使用遮罩來達到同樣的效果。遮罩功能由 `imaskjs` 提供，詳情請參閱 [輸入遮罩](../../v8/input-mask/input-mask_zh-TW.md)。

<doc-tab>

<div name="type=number" class="p-4">
<doc-form-viewer config-path="NUMBER.ZH-TW"></doc-form-viewer>
</div>
<div name="使用遮罩" class="p-4">
<doc-form-viewer config-path="NUMBER_MASK.ZH-TW"></doc-form-viewer>
</div>

</doc-tab>

---

## Password

<doc-form-viewer config-path="PASSWORD.ZH-TW"></doc-form-viewer>

---

## Checkbox / Radio

使用 `options.data` 來提供靜態選項 。若需要動態選項，請參閱 [Options](../../v8/options/options_en.md)。

### Checkbox

<doc-form-viewer config-path="CHECKBOX_MULTI.ZH-TW"></doc-form-viewer>
<doc-form-viewer config-path="CHECKBOX_BINARY.ZH-TW"></doc-form-viewer>

> 只提供一個選項的話則可建立二元複選框。

### Radio

<doc-form-viewer config-path="RADIO.ZH-TW"></doc-form-viewer>

### Label position

將 `options.labelPosition` 調整為 `before` 可把文字位置改前面，預設為 `after`。

<div class="grid md:grid-cols-2 gap-2">
    <doc-form-viewer config-path="CHECKBOX_LABEL_BEFORE.ZH-TW"></doc-form-viewer>
    <doc-form-viewer config-path="RADIO_LABEL_BEFORE.ZH-TW"></doc-form-viewer>
</div>

### Layout

將 `options.layout` 設為 `column` 可將選項改為垂直排列，預設為 `row`。另外還有 `options.containerClass` 和 `options.containerStyles` 可用於調整選項的排列方式和佈局。例：`display: grid; grid-tempalate-columns: ...`

<div class="grid md:grid-cols-2 gap-2">
    <doc-form-viewer config-path="CHECKBOX_MULTI_VERTICAL.ZH-TW"></doc-form-viewer>
    <doc-form-viewer config-path="RADIO_VERTICAL.ZH-TW"></doc-form-viewer>
</div>

---

## Select

使用 `options.data` 來提供靜態選項 。若需要動態選項，請參閱 [Options](../../v8/options/options_en.md)。

<doc-form-viewer config-path="SELECT.ZH-TW"></doc-form-viewer>

---

## Switch

<doc-form-viewer config-path="SWITCH.ZH-TW"></doc-form-viewer>

---

## Date

<doc-form-viewer config-path="DATE.ZH-TW"></doc-form-viewer>
<doc-form-viewer config-path="DATE_MIN_DATE.ZH-TW"></doc-form-viewer>

---

## Textarea

<doc-form-viewer config-path="TEXTAREA.ZH-TW"></doc-form-viewer>

---

## Range

<doc-form-viewer config-path="RANGE.ZH-TW"></doc-form-viewer>
