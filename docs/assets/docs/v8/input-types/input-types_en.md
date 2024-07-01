# Input types

Here list all the input types that are ready to use. Set the `type` to one of the following value to create an input with that type.

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

> If not provided, `text` will be used.

---

## Text

<doc-form-viewer config-path="TEXT.EN"></doc-form-viewer>

---

## Number

Set `type` to `number` will build input with `type="number"`. We can also use mask to achieve the same result. The mask feature is powered by `imaskjs`. See [Input mask](../../v8/input-mask/input-mask_en.md) for more.

<doc-tab>

<div name="type=number" class="p-4">
<doc-form-viewer config-path="NUMBER.EN"></doc-form-viewer>
</div>
<div name="Using mask" class="p-4">
<doc-form-viewer config-path="NUMBER_MASK.EN"></doc-form-viewer>
</div>

</doc-tab>

---

## Password

<doc-form-viewer config-path="PASSWORD.EN"></doc-form-viewer>

---

## Checkbox / Radio

Use `options.data` to provide static options. For dynamic options, see [Dynamic options from API endpoint](../../v8/options/options_en.md#dynamic-options-from-api-endpoint).

### Checkbox

<doc-form-viewer config-path="CHECKBOX_MULTI.EN"></doc-form-viewer>
<doc-form-viewer config-path="CHECKBOX_BINARY.EN"></doc-form-viewer>

> Provide only one option to build binary checkbox.

### Radio

<doc-form-viewer config-path="RADIO.EN"></doc-form-viewer>

### Label position

Place label at start by setting the `options.labelPosition` to `before`. Default is `after`.

<div class="grid md:grid-cols-2 gap-2">
    <doc-form-viewer config-path="CHECKBOX_LABEL_BEFORE.EN"></doc-form-viewer>
    <doc-form-viewer config-path="RADIO_LABEL_BEFORE.EN"></doc-form-viewer>
</div>

### Layout

Set `options.layout` to `column` to display options vertically, the default is `row`. There is also `options.containerClass` and `options.containerStyles` available to create other layout. e.g. `display: grid; grid-tempalate-columns: ...`

<div class="grid md:grid-cols-2 gap-2">
    <doc-form-viewer config-path="CHECKBOX_MULTI_VERTICAL.EN"></doc-form-viewer>
    <doc-form-viewer config-path="RADIO_VERTICAL.EN"></doc-form-viewer>
</div>

---

## Select

Use `options.data` to provide static options. For dynamic options, see [Dynamic options from API endpoint](../../v8/options/options_en.md#dynamic-options-from-api-endpoint).

<doc-form-viewer config-path="SELECT.EN"></doc-form-viewer>

---

## Switch

<doc-form-viewer config-path="SWITCH.EN"></doc-form-viewer>

---

## Date

<doc-form-viewer config-path="DATE.EN"></doc-form-viewer>
<doc-form-viewer config-path="DATE_MIN_DATE.EN"></doc-form-viewer>

---

## Textarea

<doc-form-viewer config-path="TEXTAREA.EN"></doc-form-viewer>

---

## Range

<doc-form-viewer config-path="RANGE.EN"></doc-form-viewer>

## More Types

If the built-in types are not enough to cover the needs, we can:

- Extend the `type`
- Replace the component to be used for the existing `type`

See [Extend or Overwrite UI components](../../v8/ui-components/ui-components_en.md#extend-or-overwrite-ui-components).
