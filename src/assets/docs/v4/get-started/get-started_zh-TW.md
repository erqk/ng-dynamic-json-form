# 開始使用

## 安裝

從 npm 安裝 `ng-dynamic-json-form`:

```
npm i ng-dynamic-json-form
```

<br>

將 `NgDynamicJsonFormComponent` 引入到 `NgModule` 或 standalone component.

```javascript
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';

@NgModule({
  ...
  imports: [
    ...
    NgDynamicJsonFormComponent,
  ],
})
```

<br>

最後，將樣式加入 `angular.json`:

```json
{
  ...
  "styles": [
    ...
    "ng-dynamic-json-form/lib/styles/styles.scss"
  ],
}
```

[FormControlConfig]: ../../v4/form-control-config/form-control-config_zh-TW.md
[自訂驗證器]: ../../v4/validators/validators_zh-TW.md#自訂驗證器
[自訂元件]: ../../v4/custom-components/custom-components_zh-TW.md
[自訂 UI 元件]: ../../v4/custom-components/custom-components_zh-TW.md#自訂-ui-元件
[使用自訂元件和模板]: ../../v4/styling/styling_zh-TW.md#使用自訂元件和模板
[自訂元件 - 使用 &lt;ng-template&gt;]: ../../v4/custom-components/custom-components_zh-TW.md#使用-ng-template

## @Input

| Property         | 說明                                          |
| :--------------- | :-------------------------------------------- |
| configs          | 請參閱 [FormControlConfig].                   |
| customValidators | 請參閱 [自訂驗證器].                          |
| customComponents | 請參閱 [自訂元件].                            |
| uiComponents     | 請參閱 [自訂 UI 元件].                        |
| layoutComponents | 請參閱 [使用自訂元件和模板].                  |
| layoutTemplates  | 請參閱 [使用自訂元件和模板].                  |
| inputTemplates   | 請參閱 [自訂元件 - 使用 &lt;ng-template&gt;]. |

> 如果 `configs` 是 **JSON 字串**, 需要多包一層:
>
> ```json
> {
>  "configs": [...]
> }
> ```

## @Ouput

| 事件    | 說明                                                                   |
| :------ | :--------------------------------------------------------------------- |
| formGet | 用以取得生成後的 `UntypedFormGroup`. 請參閱 [觸發副作用](#觸發副作用). |

## Provider

除了使用 `@Input` 將資料綁定, 也可使用 `provideNgDynamicJsonForm` 將資料通過 provider 傳入。以下為可傳入的欄位。

| Property         | Description                               |
| :--------------- | :---------------------------------------- |
| customValidators | 請參閱 [Custom Validators].               |
| customComponents | 請參閱 [Custom Components].               |
| uiComponents     | 請參閱 [Custom UI Components].            |
| layoutComponents | 請參閱 [Layout components and templates]. |
| outputDateFormat | 此表單所有日期元件的輸出格式。            |

```javascript
...
providers: [
  provideNgDynamicJsonForm({
    ...
  }),
],
```

## 表單綁定

### 直接和 FormControl 綁定

```javascript
control = new FormControl("");
```

<br>

方法 1:

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [formControl]="control"
></ng-dynamic-json-form>
```

<br>

方法 2:

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [ngModel]="control"
  (ngModelChange)="control.patchValue($event)"
></ng-dynamic-json-form>
```

### 綁定到現有的 FormGroup 內

```javascript
form = new FormGroup({
  controlA: new FormControl(''),
  ...
})
```

<!-- prettier-ignore -->
```html
<form [formGroup]="form">
  <ng-dynamic-json-form
    [configs]="..."
    formControlName="controlA"
  ></ng-dynamic-json-form>
</form>
```

### 觸發副作用

可利用 `formGet` 事件取得生成後的 `UntypedFormGroup`，來監聽特定的 control，並觸發副作用。

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  (formGet)="onFormGet($event)"
></ng-dynamic-json-form>
```

```javascript
onFormGet(e: UntypedFormGroup): void {
  this.form = e;

  this.form.controls.name.valueChanges
    .pipe(
      tap(x => ...) // 副作用
    )
    .subsribe();
}
```
