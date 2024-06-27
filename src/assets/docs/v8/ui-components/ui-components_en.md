# UI Components

UI components is exactly same with the custom components. They both need to extend `CustomControlComponent`.

When the `type` is specified in the config, `NgDynamicJsonForm` willl find the matched component and use it.

```json
configs = [
	{
		...
		"type": "checkbox"
	},
	...
]
```

## Provide UI Components

Provide the `uiComponents` in the provider using `provideNgDynamicJsonForm`. There are some pre-built ui components that are ready to use. See [Pre-built UI Components](#pre-built-ui-components) below.

```tsx
import { ApplicationConfig } from '@angular/core';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';

export const appConfig: ApplicationConfig = {
  providers: [
	  ...
    provideNgDynamicJsonForm({
	    ...
      uiComponents: UI_PRIMENG_COMPONENTS
    })
  ],
};
```

## Pre-built UI Components

[PrimeNg]: https://www.npmjs.com/package/primeng
[Angular Material]: https://www.npmjs.com/package/@angular/material

| Library            | Constant name          | Path                             |
| ------------------ | ---------------------- | -------------------------------- |
| [PrimeNg]          | UI_PRIMENG_COMPONENTS  | ng-dynamic-json-form/ui-primeng  |
| [Angular Material] | UI_MATERIAL_COMPONENTS | ng-dynamic-json-form/ui-material |

## Custom UI component

The process for building the component is exactly the same with [Custom Components](../v8/custom-components/custom-components_en.md).

The `uiComponents` can be extended, or overwritten. For example, we can extend it by adding `InputFileComponent` to the `uiComponents`. When `type` is set to `file`, the component will be used.

```tsx
import { ApplicationConfig } from '@angular/core';
import { UI_PRIMENG_COMPONENTS } from 'ng-dynamic-json-form/ui-primeng';
import { InputFileComponent } from '...';

export const appConfig: ApplicationConfig = {
  providers: [
	  ...
    provideNgDynamicJsonForm({
	    ...
      uiComponents: {
	      ...UI_PRIMENG_COMPONENTS,
	      file: InputFileComponent
      }
    })
  ],
};
```

```json
{
  "formControlName": "file",
  "label": "File upload",
  "type": "file"
}
```
