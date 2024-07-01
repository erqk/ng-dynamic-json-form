# Props

使用 `props` 來將 properties 和 attributes 綁定到目標元件和元素。

以下的 properties 綁定：

```html
<p-calendar ... [iconDisplay]="'input'" [showIcon]="true"></p-calendar>
```

可使用 `props` 達成：

```json
{
  ...
  "type": "date",
  "props": {
    "showIcon": true,
    "iconDisplay": "input"
  }
}
```

## 綁定目標

以下為各個內建的欄位類型所對應的綁定目標。

### Angular Material

| 類型     | 目標                  | 選擇器 / 元件                   |
| :------- | :-------------------- | :------------------------------ |
| checkbox | `MatCheckbox`         | `<mat-checkbox>`                |
| date     | `MatDatepickerInput`  | `input[matDatepicker]`          |
| radio    | `MatRadioGroup`       | `<mat-radio-group>`             |
| range    | `MatSlider`           | `<mat-slider>`                  |
| select   | `MatSelect`           | `<mat-select>`                  |
| switch   | `MatSlideToggle`      | `<mat-slide-toggle>`            |
| text     | `MatInput`            | `input[matInput]`               |
| textarea | `CdkTextareaAutosize` | `textarea[cdkTextareaAutosize]` |

### PrimeNG

| 類型     | 目標            | 選擇器 / 元件              |
| :------- | :-------------- | :------------------------- |
| checkbox | `Checkbox`      | `<p-checkbox>`             |
| date     | `Calendar`      | `<p-calendar>`             |
| radio    | `RadioButton`   | `<p-radioButton>`          |
| range    | `Slider`        | `<p-slider>`               |
| select   | `Dropdown`      | `<p-dropdown>`             |
| switch   | `InputSwitch`   | `<p-inputSwitch>`          |
| text     | `InputText`     | `input[pInputText]`        |
| textarea | `InputTextarea` | `textarea[pInputTextarea]` |

## 日期

JSON 不支援 JavaScript 的日期物件。若要轉換為日期物件，請使用下列格式之一傳入：

- ISO 8601
- 將日期字串用 `Date(...)` 包起來，例：`Date(1999/11/11)`

## 自訂元件

因為我們對於自訂元件有完整的控制權，所以自動綁定並不會自動運作。如果需要自動綁定，可以導入 `PropsBindingDirective` 並於 provider 注入 `PROPS_BINDING_INJECTORS`。這是 `NgDynamicJsonForm` 內部使用的方法。

<doc-tab>

<doc-code name="HTML">

```html
<p-calendar
  [formControl]="control"
  [propsBinding]="[
    {
      key: 'p-calendar',
      props: data.props,
    }
  ]"
></p-calendar>
```

</doc-code>

<doc-code name="TS">

```tsx
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
	...
  imports: [
	  ...
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'p-calendar',
          token: Calendar,
        },
      ],
    },
  ],
})
export class UiPrimengDateComponent extends CustomControlComponent {
	...
}
```

</doc-code>

</doc-tab>

`key` 的用處是標記要綁定的目標。如果不提供，則綁定到 `PropsBindingDirective` 的宿主元素。
