# 表單元件

## @Input

```tsx
@Input() configs: FormControlConfig[] | string = [];
@Input() customComponents?: CustomComponents;
@Input() customTemplates?: CustomTemplates;
@Input() conditionsActionFuntions?: ConditionsActionFunctions;
@Input() collapsibleState?: FormLayout['contentCollapsible'];
@Input() descriptionPosition?: FormLayout['descriptionPosition'];
@Input() rootClass?: string;
@Input() rootStyles?: string;
@Input() hideErrorMessage?: boolean;
@Input() errorComponents?: CustomErrorComponents;
@Input() errorComponentDefault?: Type<CustomErrorMessage>;
@Input() errorTemplates?: CustomTemplates;
@Input() errorTemplateDefault?: TemplateRef<any>;
@Input() labelComponents?: CustomLabelComponents;
@Input() labelComponentDefault?: Type<CustomFormLabel>;
@Input() labelTemplates?: CustomTemplates;
@Input() labelTemplateDefault?: TemplateRef<any>;
@Input() loadingComponent?: Type<any>;
@Input() loadingTemplate?: TemplateRef<any>;
@Input() optionsSources?: { [key: string]: Observable<OptionItem[]> };
```

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

## @Output

```tsx
@Output() formGet = new EventEmitter<UntypedFormGroup>();
@Output() optionsLoaded = new EventEmitter();
@Output() displayValue = new EventEmitter<FormDisplayValue>();
@Output() updateStatusFunctions = new EventEmitter<FormStatusFunctions>();
```

### formGet

當表單生成完畢時觸發的事件，並將生成的 `UntypeFormGroup` 發送出去。

### onChange

用戶行為導致的表單的值變化事件。

### optionsLoaded

當所有選項載入完成後觸發。

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
