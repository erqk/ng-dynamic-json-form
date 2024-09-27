# 自訂元件

使用自訂元件來為控制器建立複雜的表單。

## 建立自訂元件

假設我們需要一個專門處理檔案資料的元件。首先建立一個名為 `InputFileComponent` 的元件，然後繼承 `CustomControlComponent`，再將 `control` 覆寫為任一 `AbstractControl` 的實體。

<doc-code>

```ts
import { CustomControlComponent } from 'ng-dynamic-json-form';

@Component({...})
export class InputFileComponent extends CustomControlComponent {
	override control = new FormControl<File | null>(null);
}
```

</doc-code>

> `CustomControlComponent` 的底層已實作 [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor) 和 [Validator](https://angular.io/api/forms/Validator)。`control` 則是父層控制器和此元件的連接橋樑，因此強烈建議使用 `control` 來綁定此元件的 FormGroup 或者 FormControl，如此可省去重複撰寫 `writeValue()` 和 `registerOnChange()` 的邏輯。
>
> <doc-code enable-copy="false">
>
> ```ts
> @Component({...})
> export class CustomControlComponent implements ControlValueAccessor, Validator {
> 	...
> 	writeValue(obj: any): void {
>     this.control?.patchValue(obj);
>   }
> 	registerOnChange(fn: any): void {
> 	  this.control?.valueChanges.subscribe(fn);
> 	}
> }
> ```
>
> </doc-code>
>
> **註** 如果此元件只用於 `NgDynamicJsonFormComponent`，則不需要特別在 provider 加入  `NG_VALUE_ACCESSOR` 和 `NG_VALIDATORS`。

接下來，將 `control` 綁定到 input 並監聽 `input` 事件。

<doc-tab>
<doc-code name="HTML">

```html
<input type="file" [formControl]="control" (input)="onFileSelect($event)" />
```

</doc-code>

<doc-code name="TS">

```ts
onFileSelect(e: Event): void {
  if (this.control.disabled) return;

  const input = e.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);

  input.value = '';

  if (files.length > 0) {
	  this.control.setValue(files[0]);
  }
}
```

</doc-code>
</doc-tab>

> `data` 是此元件的設定資料
>
> <doc-code enable-copy="false">
>
> <!-- prettier-ignore -->
> ```html
> @if (!data?.readonly) {
>     <input type="file" [formControl]="control" (input)="onFileSelect($event)" />
> } @else {
>     <span>{{ control.value.name }}</span>
> }
> ```
>
> </doc-code>
>
> 若要加入其他自訂的屬性資料，則需利用 `data.props`。請參閱 [Props](../../v8/props/props_zh-TW.md)。
>
> <doc-code enable-copy="false">
>
> <!-- prettier-ignore -->
> ```html
> <input type="file"
>   [formControl]="control"
>   [accept]="data?.props?.accept ?? '*'"
>   (input)="onFileSelect($event)"
> />
> ```
>
> </doc-code>

### 將自訂元件加入到表單內

現在 `InputFileComponent` 已可作為自訂元件是用。把它加入到 `customComponents` 內，只要有與它的 key 符合的 `formControlName` ，該元件就會被使用。

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="configs"
  [customComponents]="customComponents"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```ts
export class AppComponent {
  configs: FormControlConfig[] = [
    {
      formControlName: "name",
      label: "Name",
    },
    {
      formControlName: "inputFile",
      label: "File upload",
    },
  ];

  customComponents: CustomComponents = {
    inputFile: InputFileComponent,
  };
}
```

</doc-code>
</doc-tab>

## API

### Properties

#### control

用於和父層表單連接的控制器。可用 `FormControl`、`FormGroup` 或 `FormArray` 賦值。

#### data

此元件的設定。

#### hostForm

此 `ng-dynamic-json-form` 實體的表單 (`UntypedFormGroup`)。

#### hideErrorMessage

父元件的 `hideErrorMessage` 的值。可用來控制錯誤訊息的顯示。

### Methods

#### onOptionsGet

當動態選項資料成功接收之後，會呼叫此方法。可覆寫來改變資料接到之後的行為。

```ts
onOptionsGet(data: OptionItem[]): void {
  if (!this.data || !this.data.options) {
    return;
  }

  this.data.options.data = data;
}
```

#### markAsDirty

```ts
markAsDirty(): void {}
```

#### markAsPristine

```ts
markAsPristine(): void {}
```

#### markAsTouched

```ts
markAsTouched(): void {}
```

#### markAsUntouched

```ts
markAsUntouched(): void {}
```

#### setErrors()

<doc-code>

```ts
setErrors(errors: ValidationErrors | null): void {}
```

</doc-code>

## 使用 ng-template

有時候比較簡單的元件和邏輯，為其建立一個元件可能會太囉嗦，這時候我們可以使用 ng-template。

<doc-code>

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [customTemplates]="{
    inputFile: inputFileTemplate
  }"
>
  <ng-template #inputFileTemplate let-control="control" let-data="data">
    @if (!data?.readonly) {
      <input type="file" [formControl]="control" (input)="onFileSelect($event)" />
    } @else {
      <span>{{ control.value.name }}</span>
    }
  </ng-template>
</ng-dynamic-json-form>
```

</doc-code>

ng-template 可用的變數如下：

| 名稱             | 類型              | 說明                                         |
| ---------------- | ----------------- | -------------------------------------------- |
| control          | AbstractControl   | 此欄位的 FormControl。                       |
| data             | FormControlConfig | 此欄位的設定。                               |
| hostForm         | UntypedFormGroup  | 此 `ng-dynamic-json-form` 實體的 FormGroup。 |
| hideErrorMessage | boolean           | 父元件的 `hideErrorMessage` 的值。           |
