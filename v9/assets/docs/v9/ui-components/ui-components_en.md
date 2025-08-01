# UI Components

`uiComponents` determine which component to use when the corresponding `type` is set.

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

> The library must be installed first before using it.

[PrimeNg]: https://www.npmjs.com/package/primeng
[Angular Material]: https://www.npmjs.com/package/@angular/material

| Library            | Constant name          | Path                             |
| ------------------ | ---------------------- | -------------------------------- |
| [PrimeNg]          | UI_PRIMENG_COMPONENTS  | ng-dynamic-json-form/ui-primeng  |
| [Angular Material] | UI_MATERIAL_COMPONENTS | ng-dynamic-json-form/ui-material |

## Create a custom UI component

The process for building the custom UI component is same with [Create a custom component](../../v8/custom-components/custom-components_en.md#create-a-custom-component).

## Extend or Overwrite UI components

The `uiComponents` can be extended, or overwritten. For example, we extend `uiComponents` with a new type `file`. When the `type` is set to `file`, `InputFileComponent` will be used.

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
