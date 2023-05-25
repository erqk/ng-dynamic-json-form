## Conditions

### What is this about?

When we're building a larger form, imagine a scenario like this:

> `A` input is hidden until `B` is filled or `C` is set to value X.

Guess what, `ng-dynamic-json-form` can do it all for you automatically, just using the JSON data you provided! 😁

### Usage

Provide your conditions like this:

```javascript
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

- ### `name` (optional if nested)

  These are the condition name you can set:

  | name               | description                                        |
  | :----------------- | :------------------------------------------------- |
  | hidden             | Hide this input element.                           |
  | disabled           | Set `disable()` to this `AbstractControl`.         |
  | `validator's name` | Add the matches validators from `validators` list. |

  If the item is nested inside `groupWith`, then the parent `name` will be used.

  If the name is validator's name, then it will find the validator in `validators` list, and toggle the target validator if condition is met.

  ```javascript
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
      "name": "minLength", // Will find the minLength validator from "validators"
      //...
    }
  ]
  ```

- ### `control`

  Path to the target `AbstractControl` to listen. You can get it from `formControlName` in your data. If it's nested, join them using dot separator.

  > Path of `basicInfo` control is `"basicInfo"`.
  >
  > Path of `age` control under `basicInfo` is `"basicInfo.age"`.

- ### `controlValue`

  Value of the target `AbstractControl` to evaluate using `operator`.

- ### `operator`

  Operator to evaluate the target `AbstractControl`'s value using `controlValue`.

  ```
  "===" | "!==" | ">=" | ">" | "<=" | "<"
  ```

- ### `groupOperator` (optional)

  Operator to evaluate all the conditions inside `groupWith` together with the current one.
  | Group Operator | Description |
  |--|--|
  | && | Check every conditions of [`current`, ...`groupWith`] is met |
  | \|\| | Check some conditions of [`current`, ...`groupWith`] is met |

- ### `groupWith` (optional)

  Nested conditions to evaluate together with the current one.

  > All the fist level conditions will be evaluated as "||". If you need "&&" operator, then use `groupWith`. See example below for more details.

### Form Array conditions

If you need to add `conditions` in the `formArray`'s `template`, the starting point of the path of `AbstractControl` is the current template.

```javascript
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
            "control": "name" // ==> use "name", not "parentControl.name"
            //...
          }
        ]
      }
    ]
  }
}
```

### Example (simple condition)

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

//...will be evaluated as below:

if (basicInfo.age > 18 || basicInfo.name !== "") {
  // simpleCondition is required
}

if (basicInfo.email !== "") {
  // hide simpleCondition
}
```

### Example (complex condition)

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

//...will be evaluated as the same way as

// complexCondition is required
if (basicInfo.age > 20 && basicInfo.name === "Andrew" && (basicInfo.status === >false || basicInfo.gender === "0")) {
}
```
