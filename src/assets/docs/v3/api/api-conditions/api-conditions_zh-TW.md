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
