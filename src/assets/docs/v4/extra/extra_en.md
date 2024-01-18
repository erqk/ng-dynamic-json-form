# Extra

The additional data that is use to render the input. It will try to bind the properties to the target component, directive, or element. We can also pass in any data and set it later in our custom component.

> For custom UI component, auto binding won't work. Since we have full control over the component, we need to do property binding manually.

## Binding target

The following shows the targe to bind based on the `type`.

### Angular Material

| Type      | Target              | Selector                        |
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

| Type      | Target        | Selector                   |
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

## Example

The following config:

```json
{
  ...,
  "type": "date",
  "extra": {
    "showIcon": true,
    "iconDisplay": "input"
  }
}
```

...has the same effect as:

```html
<p-calendar ... [iconDisplay]="'input'" [showIcon]="true"></p-calendar>
```
