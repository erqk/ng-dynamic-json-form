# 表單元件

## @Input

```tsx
@Input() configs: FormControlConfig[] | string = [];
@Input() customComponents?: CustomComponents;
@Input() customTemplates?: CustomTemplates;
@Input() conditionsActionFuntions?: ConditionsActionFunctions;
@Input() hideErrorMessage?: boolean;
@Input() collapsibleState?: FormLayout['contentCollapsible'];
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

請參閱 [Configs](../../v8/configs/configs_en.md)。

### customComponents

請參閱 [Custom Components](../../v8/custom-components/custom-components_en.md)。

### conditionsActionFuntions

請參閱 [Execute custom function](../../v8/conditions/conditions_en.md#execute-custom-function)。

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

### collapsibleState

控制所有展開、收合的狀態。

### optionsSources

動態選項的自訂來源 Observable。請參閱 [Use custom observable](../../v8/options/options_en.md#use-custom-observable).

### error...

- `errorComponents`
- `errorComponentDefault`
- `errorTemplates`
- `errorTemplateDefault`

請參閱 [Custom Error](../../v8/custom-error/custom-error_en.md).

### label...

- `labelComponents`
- `labelComponentDefault`
- `labelTemplates`
- `labelTemplateDefault`

請參閱 [Custom Label](../../v8/custom-label/custom-label_en.md).

### loading...

- `loadingComponent`
- `loadingTemplate`

請參閱 [Custom Loading](../../v8/custom-loading/custom-loading_en.md).

## @Output

```tsx
@Output() formGet = new EventEmitter<UntypedFormGroup>();
@Output() optionsLoaded = new EventEmitter();
```

### formGet

當表單生成完畢時觸發的事件，並將生成的 `UntypeFormGroup` 發送出去。

### optionsLoaded

當所有選項載入完成後觸發。
