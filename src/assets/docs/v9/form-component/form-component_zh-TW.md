# 表單元件

## InputSignal

````js
configs = input<FormControlConfig[] | string>();
/**
 * User defined custom components. Use `formControlName` as the key to map target component.
 *
 * @example
 * // Config
 * {
 *    ...
 *    "formControlName": "compA"
 * }
 *
 * // TS
 * components = {
 *    compA: YourComponentA,
 *    compB: YourComponentB,
 *    ...
 * }
 */
customComponents = input<CustomComponents>();
/**
 * Custom templates for input, using `formControlName` as the key.
 * Use this if creating a custom component is way too much.
 *
 * The template variables available:
 * - `control` The FormControl for this input
 * - `data` The config for this input
 */
customTemplates = input<CustomTemplates>();
/**
 * Functions to execute when conditions is met.
 * @description
 * - When there's condition met, the function with key that match will be called.
 * - The function contains an optional argument, which is the control of where the conditions will affect to.
 */
conditionsActionFunctions = input<ConditionsActionFunctions>();

collapsibleState = input<FormLayout['contentCollapsible']>();
descriptionPosition = input<FormLayout['descriptionPosition']>();
rootClass = input<string>();
rootStyles = input<string>();
hideErrorMessage = signal<boolean | undefined>(undefined);

// Custom error components/templates
errorComponents = input<CustomErrorComponents>();
errorComponentDefault = input<Type<CustomErrorMessage>>();
errorTemplates = input<CustomTemplates>();
errorTemplateDefault = input<TemplateRef<any>>();

// Custom label components/templates
labelComponents = input<CustomLabelComponents>();
labelComponentDefault = input<Type<CustomFormLabel>>();
labelTemplates = input<CustomTemplates>();
labelTemplateDefault = input<TemplateRef<any>>();

// Custom loading components/templates
loadingComponent = input<Type<any>>();
loadingTemplate = input<TemplateRef<any>>();
/**
 * Custom observables for the options
 * @description
 * The observable with key that match with the `src` will be used.
 *
 * @example
 * ```ts
 * optionsSources = {
 *    'getCountries': ...
 * }
 *
 * config = {
 *  ...
 *  options: {
 *    ...
 *    src: 'getCountries'
 *  }
 * }
 * ```
 */
optionsSources = input<{ [key: string]: Observable<OptionItem[]> }>();
````

### configs

請參閱 [設定](../../v8/configs/configs_zh-TW.md)。

### customComponents

請參閱 [自訂元件](../../v8/custom-components/custom-components_zh-TW.md)。

### conditionsActionFuntions

請參閱 [執行自訂動作](../../v8/conditions/conditions_zh-TW.md#執行自訂動作)。

### collapsibleState

控制所有展開、收合的狀態。

### descriptionPosition

設定所有說明欄位的預設位置。

### rootClass, rootStyes

父層表單容器的 class 和 styles。

### hideErrorMessage

控制是否隱藏所遇的錯誤訊息。可用於點擊送出按鈕後，將所有錯誤訊息顯示出來。

<doc-tab>

<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
	...
	[formControl]="control"
	[hideErrorMessage]="hideErrors"
></ng-dynamic-json-form>

<button type="submit" (click)="submit()"></button>

```

</doc-code>

<doc-code name="TS">

```tsx
control = new FormControl();
hideErrors?: boolean;

submit(): void {
	if (this.control.invalid) {
		this.hideErrors = false;
		return;
	}
	...
}

```

</doc-code>

</doc-tab>

> 為了觸發 change detection，`hideErrors` 一開始為 undefined，在點擊送出按鈕之後再賦值。

### optionsSources

動態選項的自訂來源 Observable。請參閱 [Use custom observable](../../v8/options/options_zh-TW.md#使用自訂-observable).

### error...

- `errorComponents`
- `errorComponentDefault`
- `errorTemplates`
- `errorTemplateDefault`

請參閱 [自訂錯誤](../../v8/custom-error/custom-error_zh-TW.md).

### label...

- `labelComponents`
- `labelComponentDefault`
- `labelTemplates`
- `labelTemplateDefault`

請參閱 [自訂標題](../../v8/custom-label/custom-label_zh-TW.md).

### loading...

- `loadingComponent`
- `loadingTemplate`

請參閱 [自訂 Loading](../../v8/custom-loading/custom-loading_zh-TW.md).

## OutputEmitterRef

```js
formGet = output<UntypedFormGroup>();
/**
 * The value change event of the form, which trigger by the user
 * (by checking click or keydown event)
 */
onChange = output<any>();
optionsLoaded = output<void>();
displayValue = output<FormDisplayValue>();
updateStatusFunctions = output<FormStatusFunctions>();
```

### formGet

當表單生成完畢時觸發的事件，並將生成的 `UntypeFormGroup` 發送出去。

### onChange

由用戶行為所觸發的表單的值的變化事件。

### optionsLoaded

所有選項載入完成後會觸發的事件。

### displayValue

可以用來取得以下任一形式的 `form.value`：

1. 標題文字作為 key
2. 選項的值替換為顯示的文字

```ts
{
  keyMapped: any;
  keyPreserved: any;
}
```

### updateStatusFunctions

提供所有切換表單狀態的 function。

```ts
{
  setDirty: () => void;
  setPristine: () => void;
  setTouched: () => void;
  setUntouched: () => void;
}
```
