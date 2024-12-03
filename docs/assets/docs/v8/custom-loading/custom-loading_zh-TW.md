# 自訂 Loading

## 新增一個自訂 loading

自訂 loading component/ng-template 可為任何 component/ng-template，不需任何前置作業。

## 替換所有 loading

### 使用 provider

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

### 使用 component

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

### 使用 ng-template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
	... 
	[loadingTemplate]="loadingTemplate"
></ng-dynamic-json-form>

<ng-template #loadingTemplate>...</ng-template>
```
