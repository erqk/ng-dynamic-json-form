# Options

For input like checkbox, radio and select, provide `options` to let user select data.

## Static options

To give static options, provide `OptionItem[]` to `options.data` .

```json
{
	...
	"options": {
		"data": [
			{
				"label": "Option 1",
				"value": 0
			},
			...
		]
}
```

> Each of the `OptionItem` usually consists of only `label` and `value`. But other custom properties are also suppported.

## Dynamic options from API endpoint

If the options needs to be fetched from an API endpoint, then we need to provide `src`. The `src` accepts `string` or `OptionSource` . If `string` is provided, it will use as the key for custom observable, see [Use custom observable](#use-custom-observable).

For example, the API endpoint https://dummyjson.com/products will return the following data,

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
			"thumbnail": "...",
			"images": ["...", "...", "..."]
		},
		{...},
		{...},
		{...},
		...
	],
	"total": 100,
	"skip": 0,
	"limit": 30
}
```

...and we want it to map it into `OptionItem[]` like this:

```json
[
	{
		"label": "iPhone 9",
		"value": {
			"id": 1,
				"title": "iPhone 9",
				"description": "An apple mobile which is nothing like apple",
				"price": 549,
				"discountPercentage": 12.96,
				"rating": 4.69,
				"stock": 94,
				"brand": "Apple",
				"category": "smartphones",
				"thumbnail": "...",
				"images": ["...", "...", "..."]
		}
	},
	{...},
	{...},
	{...},
	...
]
```

We need to set the config as below:

```json
{
	...
	"options": {
		"src": {
			"url": "https://dummyjson.com/products",
			"method": "GET",
			"mapData": {
				"labelKey": "title",
				"contentPath": "products"
			}
		}
	}
}
```

The `labelKey` specify the property to use as the `label` , and the `contentPath` is to tell where the array of data is located. The above example shows the data we need is located at `products` , so we set `contentPath` to `"products"` .

## Body and Parameters

Use `body` to pass data during HTTP request.

- The value of `options.src.body` is static.
- The value of `options.src.trigger.body` is dynamic, its value will update when the value of the trigger control changes.

```json
{
	...
	"options": {
		"src": {
			"url": "...",
			"method": "POST",
			"mapData": {...},
			"body": {
				"brand": "...",
				"category": "..."
			}
		}
	}
}
```

For the method `GET` , `body` will transform into the parameters and merge into the URL. If the key in `body` starts with `:`, it acts as a variable that must match one within the `url`. If not, it functions as a query string key.

| Key            | Value       | URL                                                 |
| -------------- | ----------- | --------------------------------------------------- |
| `:` + `string` | smartphones | https://dummyjson.com/products/category/smartphones |
| `string`       | phone       | https://dummyjson.com/products/search?q=phone       |

<doc-tab>

<doc-code name="Using variable">

```json
{
	...
	"options": {
		"src": {
			"url": "https://dummyjson.com/products/category/:category",
			"method": "GET",
			"trigger": {
				"by": "productCategory",
				"body": {
					":category": "smartphones"
				}
			}
		}
	}
}
```

</doc-code>

<doc-code name="Using query string">

```json
{
	...
	"options": {
		"src": {
			"url": "https://dummyjson.com/products/search",
			"method": "GET",
			"trigger": {
				"by": "productCategory",
				"body": {
					"q": "phone"
				}
			}
		}
	}
}
```

</doc-code>

</doc-tab>

## Data mapping

### Primitive value

If the response data is only consists of primitive value, it’s no need to provide `labelKey` and `valueKeys`.

<doc-tab>

<doc-code name="HTTP Response">

```json
[
	"smartphones",
	"laptops",
	"fragrances",
	...
]
```

</doc-code>

<doc-code name="Config">

```json
{
	...
	"options": {
		"src": {
			"url": "https://dummyjson.com/products/categories",
			"method": "GET"
		}
	}
}
```

</doc-code>

</doc-tab>

> This is a response that returns only an array of string, `mapData` can be omitted because `contentPath` is not needed.

### Custom option value

Option’s value can be customized by providing the `valueKeys`. The `value` for each of the `OptionItem` will left only the properties listed inside the `valueKeys` .

<doc-tab>

<doc-code name="Result">

```json
[
	{
		"label": "iPhone 9",
		"value": {
			"id": 1,
			"price": 549,
			"brand": "Apple",
			"category": "smartphones",
		}
	},
	{...},
	{...},
	{...},
	...
]
```

</doc-code>

<doc-code name="Config">

```json
{
	...
	"options": {
		"src": {
			"url": "https://dummyjson.com/products",
			"method": "GET",
			"mapData": {
				"labelKey": "title",
				"contentPath": "products",
				"valueKeys": ["id", "price", "brand", "category"]
			}
		}
	}
}
```

</doc-code>

</doc-tab>

If the `valueKeys` has only one item, then the `value` will become primitive.

<doc-tab>

<doc-code name="Result">

```json
[
	{
		"label": "iPhone 9",
		"value": "iPhone 9"
	},
	{...},
	{...},
	{...},
	...
]
```

</doc-code>

<doc-code name="Config">

```json
{
	...
	"options": {
		"src": {
			"url": "https://dummyjson.com/products",
			"method": "GET",
			"mapData": {
				"labelKey": "title",
				"contentPath": "products",
				"valueKeys": ["title"],
			}
		}
	}
}
```

</doc-code>

</doc-tab>

### Hoisting nested value

The following example shows how to hoist childA and childB to the top level.

<doc-tab>
<doc-code name="HTTP Response">

```json
[
	{
		"id": 1,
		"name": "...",
		"propA": {
			"childA": "...",
			"propB": {
				"childB": "..."
			}
		}
	},
	{...},
	{...},
	{...},
	...
]

```

</doc-code>

<doc-code name="Result">

```json
[
	{
		"label": "...",
		"value": {
			"id": 1,
			"name": "...",
			"childA": "...",
			"childB": "..."
		}
	},
	{...},
	{...},
	{...},
	...
]

```

</doc-code>

<doc-code name="Config">

```json
{
	...
	"options": {
		"src": {
			"url": "...",
			"method": "...",
			"mapData": {
				"labelKey": "name",
				"valueKeys": ["id", "name", "propA.childA", "propA.propB.childB"]
			}
		}
	}
}

```

</doc-code>

</doc-tab>

## Using a trigger

Trigger is use to make new request for the options of a control, based on the value changes from another control.

Let’s say we have a select `productCategory` and another select `product` . If the value of the `productCategory` changes, `product` will retrieve the value of `productCategory` and make a http request to get all the products of that category.

```json
[
	{
		...
		"formControlName": "productCategory",
		"options": {
			"src": {
				"url": "https://dummyjson.com/products/categories",
				"method": "GET"
			}
		}
	},
	{
		...
		"formControlName": "product",
		"options": {
			"src": {
			"url": "https://dummyjson.com/products/category/:category",
			"method": "GET",
			"trigger": {
				 "by": "productCategory",
				 "body": {
					 ":category": "productCategory"
					}
				}
			}
		}
	}
]
```

`trigger.by` is the path to the control we want to listen its `valueChanges` event. When `productCategory` changes, its value will be get and merged into the URL.

If the `productCategory`'s value is "smartphones", then the result URL will be:

```text
https://dummyjson.com/products/category/smartphones
```

### Control path and value path

The value of every key inside `trigger.body` is the path to the value we need, which can be separated by `controlPath` and `valuePath` by using `,`.

```json
{
	...
	"body": {
		"key": "controlPath, valuePath",
		...
	}
}
```

- `controlPath` Path to the target control which contains value we need.
- `valuePath` Path to the property we need, when the control's value is non-primitive.

<doc-tab>
<doc-code name="Form's value">

```json
{
  "controlA": {
    "foo": {
      "baz": "..."
    },
    "bar": "..."
  },
  "controlB": "...",
  "controlC": "..."
}
```

</doc-code>
<doc-code name="Config">

```json
{
	...
	"options": {
		"src": {
			"url": "https://dummyjson.com/products/search",
			"method": "GET",
			"trigger": {
				"by": "controlA",
				"body": {
					"q": "controlA, foo.baz"
				}
			}
		}
	}
}
```

</doc-code>
</doc-tab>

## Using a filter

The example below demonstrates that when the value of the control `productCategory` changes, the data is filtered by comparing the `productCategory` value with the `category` property.

```json
[
	{
		"formControlName": "productCategory",
		"options": {
			"src": {
				"url": "https://dummyjson.com/products/categories",
				"method": "GET"
			}
		}
	},
	{
		...
		"options": {
			"src": {
				"url": "https://dummyjson.com/products",
				"method": "GET",
				"mapData": {
					"contentPath": "products",
					"labelKey": "title"
				},
				"filter": {
					"by": "productCategory",
					"conditions": {
						"&&": [
							["", "===", "category"]
						]
					}
				}
			}
		}
	}
]
```

### Filter conditions

The syntax of `filter.conditions` is similar with the one in the [Conditions](../../v8/conditions/conditions_en.md). The only difference is every element’s position in the tupple must be as the following:

`[0, 1, 2]`

| Position | Description                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------- |
| 0        | Target control’s value. Use empty string if value is primitive.                                     |
| 1        | The [OPERATOR](../../v8/conditions/conditions_en.md#left-operator-right) use to evaluate condition. |
| 2        | The value of each `OptionItem` to compare. Use empty string if value is primitive.                  |

#### Nested condition

`conditions` support nested `conditions`.

```json
{
	...
	"options": {
		"src": {
			...
			"filter": {
				...
				"conditions": {
					"&&": [
						["", "===", "category"],
						{
							"||": [...]
						}
					]
				}
			}
		}
	}
}
```

## Use custom observable

If the `src` is a string, then it is use as a key to match with the Observable inside `optionsSources`. The Observable must return `OptionItem[]`.

<doc-tab>

<doc-code name="HTML">

```html
<ng-dynamic-json-form ... [optionsSources]="optionsSources"></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
optionsSources = {
  products$: this._http.get("https://dummyjson.com/products").pipe(
    map((x) => (x as any).products),
    concatAll(),
    map((x: any) => ({ label: x.title, value: x })),
    toArray(),
  ),
};
```

</doc-code>

<doc-code name="Config">

```json
{
	...
	"options": {
		"src": "products$",
		...
	}
}
```

</doc-code>

</doc-tab>

## API

### FormControlOptions

```ts
export interface FormControlOptions {
	data?: OptionItem[]:
	src?: string | OptionSource;
	srcAppendPosition?: 'after' | 'before';
	autoSelectFirst?: boolean;
	layout?: 'row' | 'column';
	labelPosition?: 'before' | 'after';
	containerClass?: string;
	containerStyles?: string;
}
```

#### data

The array of options data.

#### src

Provide this to use dynamic options.

#### srcAppendPosition

Append dynamic options after or before the static options.

#### autoSelectFirst

Auto select the first option available on init.

#### layout

The layout of the options.

#### labelPosition

The position of the label.

#### containerClass

The class to add to the container of the options.

#### containerStyles

The styles to add to the container of the options.

### OptionItem

```tsx
export interface OptionItem {
  label: string;
  value?: any;
  [key: string]: any;
}
```

### OptionSource

```tsx
export interface OptionSource {
  url: string;
  method: "GET" | "POST";
  headers?: { [key: string]: string | string[] };
  body?: { [key: string]: any };
  mapData?: {
    labelKey: string;
    valueKeys?: string[];
    contentPath?: string;
    slice?: [number, number];
    appendPosition?: "after" | "before";
  };
  trigger?: {
    by: string;
    body: { [key: string]: string };
    debounceTime?: number;
  };
  filter?: {
    by: string;
    conditions: ConditionsGroup;
    debounceTime?: number;
  };
}
```

#### url

The url of the API endpoint.

#### method

The HTTP method use to fetch the data.

#### headers

The HTTP headers to append.

#### body

The body to send over http request.

#### mapData

The information of how to map the data from http response to `OptionItem[]`.

- `labelKey` The property to use as the label.
- `valueKeys` A list of properties to map new value.
- `contentPath` To tell where the array of data is located.
- `slice` Slice the data after fetched.

#### trigger

Provide to fetch data using the value of target control.

- `by` The path of the control to listen its valueChanges.
- `debounceTime` The delay to add (milliseconds).
- `body` The parameters to be used in the HTTP request.

#### filter

- `by` The path of the control to listen its valueChanges.
- `debounceTime` The delay to add (milliseconds).
- `conditions` The conditions use to filter out the desire data.
