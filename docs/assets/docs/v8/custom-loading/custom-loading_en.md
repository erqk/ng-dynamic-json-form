# Custom Loading

## Create a custom loading

Custom loading component/ng-template accepts any kind of component/ng-template. It has nothing special to do.

## Overwrite all the loadings

### Using provider

```tsx
import { Component } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';
import { CustomLoadingComponent } from '...';

@Component({
	...
	providers: [
		provideNgDynamicJsonForm({
			...
			loadingComponent: CustomLoadingComponent
		}),
	]
})
```

### Using component

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
	...
	[loadingComponent]="loadingComponent"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
import { CustomLoadingComponent } from "...";

loadingComponent = CustomLoadingComponent;
```

</doc-code>
</doc-tab>

### Using template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
	... 
	[loadingTemplate]="loadingTemplate"
></ng-dynamic-json-form>

<ng-template #loadingTemplate>...</ng-template>
```
