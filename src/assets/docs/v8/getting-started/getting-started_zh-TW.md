# 開始

> 僅支援 Angular 16 至 Angular 19 的版本。

## 安裝

### 從 npm 安裝 [🔗](https://www.npmjs.com/package/ng-dynamic-json-form)

<doc-code>

```json
npm i ng-dynamic-json-form
```

</doc-code>

### 導入樣式

使用下列方法之一匯入樣式。

<doc-tab>
<doc-code name="angular.json">

```json
"styles": [
    ...
    "node_modules/ng-dynamic-json-form/styles/styles.scss"
],
```

</doc-code>
<doc-code name="styles.scss">

```scss name="styles.scss"
...
@use "ng-dynamic-json-form/styles/styles.scss";

// Use @use instead of @import
// See https://sass-lang.com/documentation/at-rules/import
```

</doc-code>
</doc-tab>

## 用法

導入 `NgDynamicJsonFormComponent`。

<doc-code>

```typescript
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';

...
@Component({
  ...,
  imports: [
    ...,
    NgDynamicJsonFormComponent,
  ],
})
```

</doc-code>

將 `configs` 傳給 `ng-dynamic-json-form` 元件，就能生成一個簡單的表單。請參閱 [設定](../../v8/configs/configs_zh-TW.md)。

<doc-tab>
<doc-code name="HTML">

```html
<ng-dynamic-json-form [configs]="configs"></ng-dynamic-json-form>
```

</doc-code>
<doc-code name="TS">

```typescript
configs = [
  {
    formControlName: "name",
    label: "Name",
    type: "text",
  },
];
```

</doc-code>
</doc-tab>

<doc-form-viewer show-form-only="true" configs='[
    {
      "formControlName": "name",
      "label": "Name"
    }
]'></doc-form-viewer>

## 使用第三方 UI

我們可以使用第三方 UI 的元件來生成表單，請參閱 [提供 UI 元件](../../v8/ui-components/ui-components_zh-TW.md#提供-ui-元件)。

## 綁定表單

### 使用 FormControl

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  [formControl]="control"
></ng-dynamic-json-form>
```

</doc-code>
<doc-code name="TS">

```typescript
control = new FormControl();
```

</doc-code>
</doc-tab>

### 使用 FormGroup

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  ...
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

</doc-code>
<doc-code name="TS">

```typescript
form?: UntypedFormGroup;

onFormGet(e: UntypedFormGroup): void {
  this.form = e;
}
```

</doc-code>
</doc-tab>

## 事件監聽

產生表單後，`formGet` 事件將會觸發，並發送一個 `UntypedFormGroup`。我們可以取得並監聽 `valueChanges` 事件。

```tsx
form?: UntypedFormGroup;

onFormGet(e: UntypedFormGroup): void {
  this.form = e;
  this.form.valueChanges.pipe(
    ...
  ).subscribe();
}

```

或者只監聽特定的控制器，並執行特定的動作。

```tsx
form?: UntypedFormGroup;

onFormGet(e: UntypedFormGroup): void {
  this.form = e;
  this.form.controls.name.valueChanges.pipe(
    tap(x => {
      if (x.length > 10) {
        ...
      }
    })
  ).subscribe();
}

```
