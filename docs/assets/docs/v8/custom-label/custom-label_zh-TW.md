# 自訂標題

## 新建一個自訂標題

### 使用 component

新建一個 component 並繼承/實作 `CustomFormLabel`。

```tsx
import { Component } from '@angular/core';
import { CustomFormLabel } from 'ng-dynamic-json-form';

@Component({
	...
})
export class CustomFormLabelComponent extends CustomFormLabel {}
```

### 使用 ng-template

新建一個 ng-template，然後根據需要加入相關的 properties。

```html
<ng-template #customLabelTemplate let-label="label" let-layout="layout" ...> ... </ng-template>
```

## Properties

| 名稱        | 型別       | 說明                                   |
| :---------- | :--------- | :------------------------------------- |
| collapsible | boolean    | 此欄位內容是否可展開/收合。            |
| expand      | boolean    | 此欄位的收合狀態。                     |
| label       | string     | 此欄位的標題。The text for this label. |
| layout      | FormLayout | 此欄位的 `layout` 設定。               |
| props       | any        | 此欄位的 `props` 設定。                |

## 替換所有標題

### 使用 provider

```tsx
import { Component } from '@angular/core';
import { provideNgDynamicJsonForm } from 'ng-dynamic-json-form';
import { CustomFormLabelComponent } from '...';

@Component({
	...
  providers: [
    provideNgDynamicJsonForm({
	    ...
      labelComponent: CustomFormLabelComponent
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
    [labelComponentDefault]="labelComponent"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
import { CustomLabelComponent } from "...";

labelComponent = CustomLabelComponent;
```

</doc-code>
</doc-tab>

### 使用 template

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form 
    ... 
    [labelTemplateDefault]="defaultLabelTemplate"
></ng-dynamic-json-form>

<ng-template #defaultLabelTemplate let-label="label">...</ng-template>
```

## 只替換特定欄位的標題

傳入 `labelComponents` 或 `labelTemplates`。key 是需要替換的欄位的 `formControlName`。

### 使用 component

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
    ...
    [labelComponents]="labelComponents"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
labelComponents = {
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
    [labelTemplates]="{
        name: nameLabelTemplate,
        age: ageLabelTemplate
    }"
></ng-dynamic-json-form>

<ng-template #nameLabelTemplate let-label="label">...</ng-template>
<ng-template #ageLabelTemplate let-label="label">...</ng-template>
```
