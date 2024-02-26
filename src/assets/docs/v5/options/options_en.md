# Options

A list of data for selection. Basically it is use with `radio`, `checkbox`, and `select` input type. It can also be used inside your custom component.

## Properties

```javascript
export interface FormControlOptions {
  data?: OptionItem[];
  sourceList?: OptionSource[];
  sourceAppendPosition?: "after" | "before";
  trigger?: OptionTrigger;
  layout?: "row" | "column";
  labelPosition?: "before" | "after";
  containerClass?: string;
  containerStyles?: string;
}
```

| Property             | Description                                                                       |
| :------------------- | :-------------------------------------------------------------------------------- |
| data                 | List of static and dynamic data. See [OptionItem](#optionitem).                   |
| sourceList           | Config for dynamic data. See [OptionSource](#optionsource).                       |
| sourceAppendPosition | Order of the dynamic data if static data provided. See [OptionItem](#optionitem). |
| trigger              | See [OptionTrigger](#optiontrigger).                                              |
| autoSelectFirst      | Automatically select the first item.                                              |
| layout               | Flex direction. Can be overwrite by `containerClass`, `containerStyles`.          |
| labelPosition        | The label position of the input.                                                  |
| containerClass       | `class` of the container of the options.                                          |
| containerStyles      | `styles` of the container of the options.                                         |

## OptionItem

Static data to generate option items directly. It's also the place to get the data obtained from API endpoints. If `OptionSource` is setup correctly and data is successfully fetched, then the data will append to this field, where the position is depending on the `sourceAppendPosition`.

### Properties

```javascript
export interface OptionItem {
  label: string;
  value?: any;
}
```

| Property | Description              |
| :------- | :----------------------- |
| label    | The label of the option. |
| value    | The value of the option. |

### Binary checkbox

To make a checkbox binary, put just one item inside `data`, and the `value` is not required.

```json
{
  ...
  "options": {
    "data": [
      {
        "label": "I'm a binary checkbox"
      }
    ]
  }
}
```

## OptionSource

Get the data from a list of API endpoints in order.

### Properties

```javascript
export interface OptionSource {
  src: string;
  method: "GET" | "POST";
  params?: { [key: string]: any };
  data: {
    labelKey: string,
    path?: string,
    valueKeys?: string[],
  };
  slice?: [number, number];
}
```

| Property | Description                            |
| :------- | :------------------------------------- |
| src      | API URL.                               |
| method   | `GET`, `POST`                          |
| params   | See [Request params](#request-params). |
| data     | See [Map input data](#map-input-data). |
| slice    | The range of data to pick.             |

### Request params

```json
{
  ...
  "params": {
    "id": 1,
    "title": "string"
  }
}
```

By default, `params` only support static value, and it will be transformed into the following result when request is sent.

| Method | Result                                  |
| :----- | :-------------------------------------- |
| GET    | `src`?id=1&title=string                 |
| POST   | `payload: {"id": 1, "title": "string"}` |

For dynamic params, it will only works if `trigger` is set. See [OptionTrigger](#optiontrigger).

### Map input data

Map the data get from the API to use in option items.

| Property       | Description                                                                      |
| :------------- | :------------------------------------------------------------------------------- |
| data.path      | The path of the data in the API response object. (separated by `.`)              |
| data.labelKey  | The key where it's value will use as label.                                      |
| data.valueKeys | The keys to form the object to use as the option's value. Left empty to use all. |

### Example

The following example shows how to build a multi select checkbox of products.

<br>

1. The config is:

```json
{
  ...
  "options": {
    "src": "https://dummyjson.com/products",
    "data": {
      "path": "products",
      "labelKey": "title",
      "valueKeys": ["id", "title", "price"]
    }
  }
}
```

<br>

2. The HTTP response get:

```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
          "https://i.dummyjson.com/data/products/1/1.jpg",
          "https://i.dummyjson.com/data/products/1/2.jpg",
          "https://i.dummyjson.com/data/products/1/3.jpg",
          "https://i.dummyjson.com/data/products/1/4.jpg",
          "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    },
    ...
  ]
}
```

<br>

3. Finally, the checkbox will take `title` as the label and it's value is trimmed.

<div style="display:grid; grid-template-columns:auto 1fr; gap:0.5rem; margin:2rem;">
  <input type="checkbox">
  <span>iPhone 9</span>
</div>

```javascript
[
  {
    id: 1,
    title: "iPhone 9",
    price: 549,
  },
  ...
];
```

> If length of `valueKeys` is equal to 1, then the value will not be an object.
>
> ```javascript
> {
>   ...
>   "valueKeys": ["id"]
> }
> // Ouput: [1, 2, 3, ...]
> ```

## OptionTrigger

Filter data or request new data from API endpoint, based on the value of another control.

### Properties

```javascript
export interface OptionTrigger extends OptionSource {
  action: "FILTER" | "REQUEST";
  triggerValuePath: string;
  filterMatchPath?: string;
  debounceTime?: number;
}
```

| Property         | Description                                                 |
| :--------------- | :---------------------------------------------------------- |
| ...OptionSource  | See [OptionSource](#optionsource).                          |
| action           | The action to take when value of target control changes.    |
| triggerValuePath | Path of the value to listen to.                             |
| filterMatchPath  | Path of the value to use in the filter of this control.     |
| debounceTime     | Debounce time for the `valueChanges` of the target control. |

### Filter data

Value of `formControlA`:

```javascript
{
  formGroup: {
    formControlA: {
      value: {
        propertyA: ...,
        ...
      }
    },
  },
  ...
}
```

Value for each of the option in `formControlB`:

```javascript
{
  data: {
    id: ...,
    ...
  }
}
```

To filter options data in `formControlB` based on the value of `formControlA`, set the `triggerValuePath` and `filterMatchPath` to:

```json
{
  ...
  "formControlName": "formControlB",
  "options": {
    "trigger": {
      ...
      "action": "FILTER",
      "triggerValuePath": "formGroup.formControlA,value.propertyA",
      "filterMatchPath": "data.id"
    }
  }
}

```

> Use `,` to separate the control path and the value path, if both of them need to be provided.

### Request data

> This section will only talk about how `params` works in `GET` method, beause the `params` simply becomes the payload when using `POST`.

When `trigger` is set, the value for every key inside `params` is the value path inside the target control, then the `params` will add into the request URL.

<br>

Different type of `src` will produce different type of request URL.

| Src                    | Request URL                       |
| :--------------------- | :-------------------------------- |
| https://.../:id/:title | https://.../1/book                |
| https://.../book       | https://.../book?id=1&title=apple |

#### Primitive value

If the control's value is primitive, use empty string `""` to represent.

```javascript
// control.value
99;
```

```json
{
  ...
  "options": {
    "trigger": {
      ...
      "params": {
        "id": ""
      }
    }
  }
}
```

#### Non-primitive value

If the control's value is an object, use `.` period delimiter for the complete path.

```javascript
// control.value
{
  prop1: ...,
  prop2: {
    child1: ...,
    ...
  }
}
```

```json
{
  ...
  "options": {
    "trigger": {
      ...
      "params": {
        "id": "prop1",
        "title": "prop2.child1"
      }
    }
  }
}
```
