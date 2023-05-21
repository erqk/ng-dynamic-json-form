# NgDynamicJsonForm API

## JSON 資料欄位

```javascript
jsonData: FormControlConfig[] = [
  {
    label: ...,
    formControlName: ...,
    value: ...,
    placeholder: ...,
    description: ...,
    type: ...,
    validators: [],
    conditions: [],
    options: [],
    optionsLayout: ...,
    cssGrid: {},
    children: [],
    formArray: {},
    customComponent: ...,
    extra: {}
  }
  //...
]
```

| 欄位            | 說明                                        |
| :-------------- | :------------------------------------------ |
| label           | 欄位標題。                                  |
| formControlName | `AbstractControl` 名稱。                    |
| value           | 預設值。                                    |
| placeholder     | 輸入框的提示文字。                          |
| description     | 欄位標題下的說明文字。                      |
| type            | 輸入元件類型                                |
| options         | 由 `label` 和 `value` 構成的陣列,           |
| optionsLayout   | `row` \|\| `column`. 和 `options` 搭配使用  |
| cssGrid         | CSS grid 屬性，用於設定表單內的版型         |
| customComponent | 用於 `customComponents` 列表的索引 `key` 值 |
| extra           | 此輸入元件的附加信息                        |
| children        | 用於製作 `FormGroup`。                      |
| formArray       | 用於製作 `FormArray`。                      |

## 輸入欄位的類型 (types)

以下為內建的輸入元件類型。你可以建立此列表以外的元件，只需要在 `type` 指定對應的值。

```
'text' | 'textarea' | 'password' | 'number' | 'email' | 'switch'| 'radio'| 'checkbox'| 'dropdown'
```

## 選項列表 (options)

如果輸入元件需要提供用戶選項做選擇，你可以將選項塞入 `options` 內。每一個物件內必須是由 `label` 和 `value` 組成。
此陣列資料用於一些需要選項的元件，例如 `radio`, `checkbox`, `dropdown`。

> 如果 `type` 是 `radio`, `checkbox`, `dropdown` 則必須提供此列表。
>
> 如果 `type` 是 `radio`, `checkbox`，你可以設定 `optionsLayout` 為 `row` 或 `column`。

```javascript
//...
"options": [
  {
    "label": "...", //string
    "value": "..." //any
  }
]
```

## CSS Grid

表單內的版型是基於 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" target="_blank">CSS Grid</a> 達成的，因此你可以提供以下參數來組合出不同的版型：

```json
{
  //...
  "cssGrid": {
    "gridTemplateColumns": "...",
    "gridColumn": "...",
    "gridRow": "..."
  }
}
```

| 欄位                  | 說明                                      |
| :-------------------- | :---------------------------------------- |
| `gridTemplateColumns` | 等同於 CSS 屬性 `grid-template-columns`。 |
| `gridColumn`          | 等同於 CSS 屬性 `grid-column`。           |
| `gridRow`             | 等同於 CSS 屬性 `grid-template-columns`。 |

> 每個屬性的詳細內容和範例，可以參閱 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns" target="_blank">grid-template-columns
> </a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column" target="_blank">grid-column
> </a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row" target="_blank">grid-row
> </a>。
>
> 更多版型範例，請參考 **樣式** 頁面。

## 額外資訊（extra）

可塞入額外的參數

範例:

```html
<!-- prettier-ignore -->
<ng-container *ngIf="control && data">
  <textarea pInputTextarea
    [rows]="data.extra?.['rows'] || 5"
    [cols]="data.extra?.['cols'] || 30"
    [formControl]="control"
    [autoResize]="data.extra?.['autoResize'] === true"
  ></textarea>
</ng-container>
```

## Form 陣列

若你需要建立 Form 陣列，則可將陣列的資訊塞入 `formArray` 欄位，以此告訴 `ng-dynamic-json-form` 怎麼構建它。

```json
{
  // ...
  "formControlName": "...",
  "value": [],
  "formArray": {
    "length": "...",
    "templateLabel": "...",
    "template": [],
    "editable": "...",
    "minLength": "...",
    "maxLength": "..."
  }
}
```

- ### `templateLabel`

  陣列內 `FormGroup` 的標題。每一個標題後面會自動加上數字，來表示這是陣列內的第幾個表單。

  ```javascript
  //...
  templateLabel: "User",
  //...

  // Output: User 1, User 2, ...
  ```

- ### `template`

  陣列內 `FormGroup` 的模板，使用 `FormControlConfig` 型別。

- ### `length` (選填)

  預設建立的 `FormGroup` 數量。如果設定了 `value`，則使用 `value` 內的資料長度。

- ### `editable` (選填)

  是否顯示按鈕來新增、刪除 `FormGroup`。

- ### `minLength` (選填)

  `FormArray` 的最小長度。

- ### `maxLength` (選填)
  `FormArray` 的最大長度。

## 驗證器 (validators)

設定此 `AbstractControl` 的驗證器列表

| 名稱         | 說明                                                            |
| :----------- | :-------------------------------------------------------------- |
| required     | `Validators.required`                                           |
| requiredTrue | `Validators.requiredTrue`                                       |
| min          | `Validators.min(value)`                                         |
| max          | `Validators.max(value)`                                         |
| minLength    | `Validators.minLength(value)`                                   |
| maxLength    | `Validators.maxLength(value)`                                   |
| pattern      | `Validators.pattern(value)`                                     |
| email        | 使用正則 `/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/` 的自定驗證器 |
| custom       | 從 `customValidators` 內用 `value` 尋找對應的驗證器             |

```json
//...
"validators": [
  {
    "name": "...",
    "value": "...",
    "message": "..."
  }
]
```

- ### `name`

  請參閱以上表格

- ### `value` (選填)

  給需要特定值的驗證器使用。請參閱以上表格。

- ### `message` (選填)

  自定義驗證訊息。可使用 `{{value}}` 來顯示目前輸入的值。

  ```javascript
  {
  //...
  "message": "你的 id: {{value}} 格式不正確"
  }

  // Output: 你的 id: 123456 格式不正確
  ```

## 自定義驗證器

你可以自己建立更強大的驗證器，並將它們放到一個常數內：

```javascript
/**
 * @type {{
 *  [key: string]: ValidatorFn
 * }}
 */
customValidators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

之後，將該常數綁定到 `customValidators`:

```HTML
<!-- prettier-ignore -->
<ng-dynamic-json-form
 ...
 [customValidators]="customValidators"
></ng-dynamic-json-form>
```

現在，你可以在 JSON 資料內，針對特定的 `AbstractControl` 來設定要使用的自定驗證器。`value` 需對應到剛剛建立好的常數 `key`。

```json
{
  //...
  "validators": [
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ]
}
```

## 條件 (conditions)

### 這是什麼?

當我們的表單比較複雜的時候，一般會有以下的需求：

> 隱藏 `A` 輸入框，直到 `B` 已填寫或者 `C` 的值被設定為 X.

`ng-dynamic-json-form` 能為你將上述需求自動完成，只需在 JSON 資料內設定好條件即可！😁

### 用法

設定 `conditions`：

```json
//...
"conditions": [
  {
    "name": "...",
    "control": "...",
    "controlValue": "...",
    "operator": "...",
    "groupOperator": "...",
    "groupWith": []
  }
]
```

- ### `name` (若為子層則可不填)

  以下是可提供設定的狀態：

  | 名稱         | 說明                                   |
  | :----------- | :------------------------------------- |
  | hidden       | 隱藏此輸入元件。                       |
  | disabled     | 禁用此 `AbstractControl`。             |
  | `驗證器名稱` | 從 `validators` 列表加入符合的驗證器。 |

  如果物件放在 `groupWith` 底下，則使用父層的 `name`。

  如果是 `驗證器名稱`，那就會從 `validators` 列表內，搜尋符合的驗證器，並根據設定的條件切換驗證器的使用。

  ```json
  //...
  "validators": [
    {
      "name": "minLength",
      "value": "10"
    }
    //...
  ],
  "conditions": [
    {
      "name": "minLength", // 從 "validators" 尋找 minLength 的驗證器
      //...
    }
  ]
  ```

- ### `control`

  需要監聽的 `AbstractControl` 的路徑。你可以從 JSON 資料內的 `formControlName` 去取得。若 `AbstractControl` 為巢狀，則使用 `.` 來連接他們。

  > `basicInfo` 的路徑是 `"basicInfo"`。
  >
  > `basicInfo` 下的 `age` 路徑是 `"basicInfo.age"`。

- ### `controlValue`

  目標 `AbstractControl` 的值， 使用 `operator` 判別是否滿足條件

- ### `operator`

  用來比對 `controlValue` 和目標 `AbstractControl` 的值的運算子。

  ```
  "===" | "!==" | ">=" | ">" | "<=" | "<"
  ```

- ### `groupOperator` (選填)

  設定當前條件和 `groupWith` 內所有條件的運算子

  | group operator | 描述                                                |
  | -------------- | --------------------------------------------------- |
  | &&             | 檢查每一個條件 [`current`, ...`groupWith`] 是否滿足 |
  | \|\|           | 檢查任一條件 [`current`, ...`groupWith`] 是否滿足   |

- ### `groupWith` (選填)

  需要和此條件一起檢查的其他判斷條件。

  > 最外層的條件皆使用 "||" 運算子。如果你需要 "&&" 運算子，則使用 `groupWith`。請閱讀下面的範例瞭解。

### Form 陣列條件設定

如果你需要在 `formArray` 內的 `template` 模板設定條件，需注意的是 `control` 的起點是當前的 `template` 本身。

```json
{
  //...
  "formControlName": "parentControl",
  "formArray": {
    //...
    "template": [
      {
        //...
        "formControlName": "name"
      },
      {
        //...
        "conditions": [
          {
            "control": "name" // ==> 是 "name", 而非 "parentControl.name"
            //...
          }
        ]
      }
    ]
  }
}
```

### 範例 (簡單條件)

```javascript
{
  "label": "Simple condition",
  "formControlName": "simpleCondition",
  "type": "text",
  "conditions": [
    {
      "name": "required",
      "control": "basicInfo.age",
      "controlValue": 18,
      "operator": ">"
    },
    {
      "name": "required",
      "control": "basicInfo.name",
      "controlValue": "",
      "operator": "!=="
    },
    {
      "name": "hidden",
      "control": "basicInfo.email",
      "controlValue": "",
      "operator": "!=="
    }
  ]
},

//...等同於:

if (basicInfo.age > 18 || basicInfo.name !== "") {
    // simpleCondition 為必填
}

if (basicInfo.email !== "") {
    // 隱藏 simpleCondition
}
```

### 範例 (複雜條件)

```javascript
{
  "label": "Complex condition",
  "formControlName": "complexCondition",
  "conditions": [
    {
      "name": "required",
      "control": "basicInfo.age",
      "controlValue": 20,
      "operator": ">",
      "groupOperator": "&&",
      "groupWith": [
        {
          "control": "basicInfo.name",
          "controlValue": "Andrew",
          "operator": "==="
        },
        {
          "control": "basicInfo.status",
          "controlValue": false,
          "operator": "===",
          "groupOperator": "||",
          "groupWith": [
            {
              "control": "basicInfo.gender",
              "controlValue": "0",
              "operator": "==="
            }
          ]
        }
      ]
    }
  ]
}

//...等同於：

if (basicInfo.age > 20 && basicInfo.name === "Andrew" && (basicInfo.status === >false || basicInfo.gender === "0")) {
    // complexCondition 為必填
}
```

## 自定元件

### 建立

建立一個 component 並繼承 `NgDynamicJsonFormCustomComponent`。此元件內擁有必要的參數。

```javascript
//...
export class MyCustomComponent extends NgDynamicJsonFormCustomComponent {}
```

> `NgDynamicJsonFormCustomComponent` 內的參數如下：
>
> ```javascript
> export class NgDynamicJsonFormCustomComponent {
>   @Input() control: UntypedFormControl | null = null;
>   @Input() data: FormControlConfig | null = null;
> }
> ```

好了，你現在可以建立任意類型的輸入元件了！

### 自定複選框

像這種比較簡單的輸入元件，你可以這樣做：

在 template 內：

```HTML
<!-- ... -->
  <ng-container *ngFor="let item of data.options">
    <div class="field-checkbox">
      <p-checkbox
        [(ngModel)]="selectedItems"
        [name]="'group'"
        [value]="item.value"
        [inputId]="item.value"
        (onChange)="onChanged($event)"
      ></p-checkbox>
      <label [for]="item.value">{{ item.label }}</label>
    </div>
  </ng-container>
<!-- ... -->
```

在 component 內：

```javascript
ngOnInit(): void {
  this.setValue();
}

setValue(): void {
  if (!this.control || !Array.isArray(this.control.value)) {
    return;
  }

  this.selectedItems = [...this.control.value];
}

onChanged(e: { checked: any[]; originalEvent: Event }): void {
  this.control?.setValue(e.checked);
}
```

### FormGroup 類型的自定元件

或者，你也可以建立一個複雜的，使用 `FormGroup` 的輸入元件：

```javascript
formGroup = new FormGroup({
  control1: new FormControl(""),
  control2: new FormControl(""),
  control3: new FormControl(""),
});

// 將 `formGroup` 的值寫入 `control`
this.formGroup.valueChanges
  .pipe(
    debounceTime(0),
    tap((x) => this.control?.setValue(x))
  )
  .subscribe();

// 將 `FormGroup` 的狀態和 `control` 同步
this.control?.valueChanges
  .pipe(
    startWith(this.control.value),
    debounceTime(0),
    tap((x) => {
      // 避免觸發 `formGroup.valueChanges`，所以設定 emitEvent: false
      if (this.control?.disabled) this.formGroup.disable({ emitEvent: false });
      if (this.control?.enabled) this.formGroup.enable({ emitEvent: false });
    })
  )
  .subscribe();
```

### 用法

宣告一個變數，將你建立的自定元件都放一起：

```javascript
customComponents = {
  "custom-input": MyCustomInputComponent,
};
```

然後將該變數傳入 `customComponents` 內:

```HTML
<ng-dynamic-json-form
  ...
  [customComponents]="customComponents"
></ng-dynamic-json-form>
```

接下來 `ng-dynamic-json-form` 就會自動從 JSON 資料內設定的 `customComponent` 欄位來尋找對應的元件：

```json
{
  //...
  "customComponent": "custom-input",
  //...
},
```

## 自定 UI 元件

### 建立

和建立自定元件一樣，你需要新增一個 component 並繼承 `NgDynamicJsonFormCustomComponent`。

當所有自定的 UI 元件建立完成，將他們放入一個常數內：

```javascript
export const MY_UI_COMPONENTS = {
  input: MyInputComponent,
  radio: MyRadioComponent,
  checkbox: MyCheckboxComponent,
  //...
};
```

> 你可以從 `type` 列表內取得所有的 key。當然，也可以使用列表之外的 key，只要最終比對的上。

> 以下的 `type` 類型會使用設定為 `input` 的元件:
>
> - text
> - number
> - password
> - email

### 用法

宣告一個變數來存放我們的自定元件列表，然後傳入 template。

```javascript
myComponentList = MY_UI_COMPONENTS;
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="myComponentList"
></ng-dynamic-json-form>
```

### 從現有的常數引入

以下是使用 UI 套件製作好的常數：

| UI 套件 | 常數                  | 路徑                              |
| :------ | :-------------------- | :-------------------------------- |
| PrimeNg | UI_PRIMENG_COMPONENTS | `ng-dynamic-json-form/ui-primeng` |

> 要使用製作好的元件，你得先安裝相關的 UI 套件。

你可以將製作好的常數引入，並綁定到 template。

```javascript
import { UI_PRIMENG_COMPONENTS } from "ng-dynamic-json-form/ui-primeng";

//...
customUIComponentList = UI_PRIMENG_COMPONENTS; // UI_{{library}}_COMPONENTS
```

```HTML
<ng-dynamic-json-form
  ...
  [customUIComponentList]="customUIComponentList"
></ng-dynamic-json-form>
```

因為 `UI_PRIMENG_COMPONENTS` 是一個常數, 代表你可以根據需求去擴展、覆蓋甚至和其他的 UI 套件合併使用 😊

```javascript
yourList = [
  ...UI_PRIMENG_COMPONENTS,
  ...MY_UI_COMPONENTS, // 擴展其他的 type
];
```
