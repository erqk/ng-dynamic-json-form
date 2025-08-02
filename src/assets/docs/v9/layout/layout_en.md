# Layout

## Input Component Styling

Every input component is divided into several sections. Their position and nesting level is illustrated as below. Each section can be styled respectively using class or inline styles.

<input-layout-illustration></input-layout-illustration>

To do styling, provide the class or styles of the section in the `layout`.

```json
{
  "formControlName": "...",
  "type": "...",
	"layout": {
		"hostClass": "...",
		"hostStyles": "...",
		"labelClass": "...",
		"labelStyles": "...",
		...
	}
}
```

If `children` exists, which means the input is a FormGroup, then the "Input Area" section will be replaced by "Form Group" section.

<input-layout-illustration is-form-group="true" show-tags="false"></input-layout-illustration>

## Description Position

By default, description is place right after "Label", but before "Input Area". Set `layout.descriptionPosition` to `after`, to place it after the "Input Area".

<input-layout-illustration description-position="after" show-tags="false"></input-layout-illustration>

## Content Collapsible

`layout.contentCollapsible`

Provide to let content to be able to expand/collapse by clicking the label. The value is use to set the initial state of the content. `label` must be provided.

<doc-form-viewer configs='[{
  "formControlName": "collapsible",
  "label": "Label",
  "description": "description...",
  "layout": {
    "contentCollapsible": "expand",
    "hostClass": "p-4 border border-1 border-[var(--border-color-50)]"
  }
}]'></doc-form-viewer>

## Auto Add Required Class

`layout.autoAddRequiredClass`

If set to true, then `required` class will automatically add to the label element, when there is validator named `required` in the `validators` array. Default is true.

## Hide Label

`layout.hideLabel`

Use to hide the label, but still provide the label value. For example, when using Angular Material, set this to true to prevent duplicate label.

## API

### FormLayout

```tsx
export interface FormLayout {
  hostClass?: string;
  hostStyles?: string;
  labelClass?: string;
  labelStyles?: string;
  contentClass?: string;
  contentStyles?: string;
  formGroupStyles?: string;
  formGroupClass?: string;
  descriptionClass?: string;
  descriptionStyles?: string;
  inputAreaClass?: string;
  inputAreaStyles?: string;
  errorClass?: string;
  errorStyles?: string;
  descriptionPosition?: "before" | "after";
  hideLabel?: boolean;
  contentCollapsible?: "collapse" | "expand";
  autoAddRequiredClass?: boolean;
}
```
