# 自訂錯誤

## 新建一個自訂錯誤

### 使用 component

新建一個 component 並繼承 `CustomErrorMessage`。

```tsx
import { Component } from '@angular/core';
import { CustomErrorMessage } from 'ng-dynamic-json-form';

@Component({
	...
})
export class CustomErrorMessageComponent extends CustomErrorMessage {}
```

### 使用 ng-template

新增一個 ng-template，然後根據需要加入相關的 properties。

```html
<ng-template #customErrorTemplate let-errorMessages="errorMessages"> ... </ng-template>
```

## Properties

| 名稱          | 型別            | 說明               |
| :------------ | :-------------- | :----------------- |
| control       | AbstractControl | 此欄位的控制器。   |
| errorMessages | string[]        | 此欄位的錯誤訊息。 |

## 替換所有錯誤

### 使用 provider

```tsx
import { Component } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';
import { CustomErrorMessageComponent } from '...';

@Component({
	...
  providers: [
    provideNgDynamicJsonForm({
	    ...
      errorComponent: CustomErrorMessageComponent
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
	[errorComponentDefault]="errorComponent"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
import { CustomErrorComponent } from "...";

errorComponent = CustomErrorComponent;
```

</doc-code>
</doc-tab>

### 使用 ng-template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
	... 
	[errorTemplateDefault]="defaultErrorTemplate"
></ng-dynamic-json-form>

<ng-template #defaultErrorTemplate let-errorMessages="errorMessages">...</ng-template>
```

## 只替換特定欄位的錯誤

傳入 `errorComponents` 或 `errorTemplates`。key 是需要替換的欄位的 `formControlName`。

### 使用 components

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
	...
	[errorComponents]="errorComponents"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
errorComponents = {
	name: ...,
	age: ...
}
```

</doc-code>
</doc-tab>

### 使用 ng-template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
	... 
	[errorTemplates]="{
		name: nameErrorTemplate,
		age: ageErrorTemplate
	}"
></ng-dynamic-json-form>

<ng-template #nameErrorTemplate let-errorMessages="errorMessages">...</ng-template>
<ng-template #ageErrorTemplate let-errorMessages="errorMessages">...</ng-template>
```
