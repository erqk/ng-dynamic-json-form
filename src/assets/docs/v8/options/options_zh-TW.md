# 選項

`options` 用於為 checkbox、radio 和 select 之類的欄位提供選項。

## 靜態選項

若只提供靜態選項，將 `OptionItem[]` 塞入 `options.data`。

```json
{
	...
	"options": {
		"data": [
			{
				"label": "選項 1",
				"value": 0
			},
			...
		]
}
```

每個 `OptionItem` 都只有 `label` and `value`。

## 從 API 取得動態選項

若選項資料需要從 API 取得，那我們需要設定 `src`。`src` 可傳入 `string` 或者 `OptionSource` 物件。若傳入的值為 `string`，則會當作自訂 Observable 的 key，請參閱。

例如，此 API 端點 https://dummyjson.com/products 會回傳以下資料：

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

然後我們需要將它們轉為 `OptionItem[]`：

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

則需如下設定：

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

`labelKey` 負責標記要作為 `label` 的欄位，`contentPath` 負責指定陣列資料的位置。上面的例子顯示我們需要的資料在 `products` 內，所以設定 `contentPath` 為 `products`。

## Body 參數

使用 `POST` 方法進行 HTTP 傳輸時，若需要帶參數，需將參數塞入 `body` 內。

- `options.src.body` 為靜態參數。
- `options.src.trigger.body` 為動態參數，當監聽的控制器發生變化時，會使用控制器的值更新參數。

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

而對於 `GET` 方法，`body` 內的參數將根據以下 key 的寫法判斷，自動將參數轉換並塞入到請求的 URL 內。若 key 為 `:` 開頭，表示此 key 的值將尋找 URL 內所對應的變數並進行替換，否則會轉為 query string。

| Key            | Value       | URL                                                 |
| -------------- | ----------- | --------------------------------------------------- |
| `:` + `string` | smartphones | https://dummyjson.com/products/category/smartphones |
| `string`       | phone       | https://dummyjson.com/products/search?q=phone       |

<doc-tab>
<doc-code name="使用變數">

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
<doc-code name="使用 query string">

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

> 這邊的 `body` 內的參數都是靜態的，需要動態的 `body`，請參閱[使用觸發器](#使用觸發器)。

## 資料轉換

### 原始值

如果回傳的資料都是原始值，則不需提供 `labelKey` 和 `valueKeys`。

<doc-tab>

<doc-code name="HTTP 回傳內容">

```json
[
	"smartphones",
	"laptops",
	"fragrances",
	...
]
```

</doc-code>

<doc-code name="設定">

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

> 此回傳的資料為 string 陣列，`mapData` 也可不提供，因為無需提供 `contentPath`。

### 自訂選項物件

選項的物件值可透過 `valueKeys` 來修改。只有 `valueKeys` 內設定的 key 會被保留下來，成為最終 `OptionItem` 的 `value`。

<doc-tab>

<doc-code name="結果">

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

<doc-code name="設定">

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

如果 `valueKeys` 內只有一個 key，則 `value` 會變成原始值。

<doc-tab>

<doc-code name="結果">

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
<doc-code name="設定">

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

### 提升巢狀資料

以下例子說明如何把 childA 和 childB 提升到最外層。

<doc-tab>

<doc-code name="HTTP 回傳內容">

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

<doc-code name="結果">

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

<doc-code name="設定">

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

## 使用觸發器

觸發器的作用是，監聽某個控制器的值，然後用它取得當前的控制器的選項資料。

假設我們有兩個下拉，`productCategory` 和 `product`。我們想要 `productCategory` 的值發生變化後，將選中的值作為參數，取得新的 `product` 選項。

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

`trigger.by` 是需要監聽的控制器的路徑。當 `productCategory` 發生變化，它的值就會被更新到 URL 內。

假設 `productCategory` 的值是 "smartphones"，更新後 URL 會是：

```text
https://dummyjson.com/products/category/smartphones
```

### 控制器路徑和物件路徑

The value of every key inside `trigger.body` is the path to the value we need, which can be separated by `controlPath` and `valuePath`.

每一個 `trigger.body` 內的 key 的值，是指向我們需要的值的路徑。該字串可拆分為 `controlPath` 和 `valuePath`，並使用 `,` 分隔。

```json
{
	...
	"body": {
		"key": "controlPath, valuePath",
		...
	}
}
```

- `controlPath` 目標值所在的控制器路徑
- `valuePath` 如果控制器的值是物件的話，可用來指定目標欄位

<doc-tab>
<doc-code name="表單的值">

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
<doc-code name="設定">

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

## 使用過濾器

以下例子說明，當 `productCategory` 的值變化時，用 `productCategory` 的值去比對每一筆資料內的 `category`，將選項資料過濾。

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

### 過濾條件

[Conditions]: ../../v8/conditions/conditions_zh-TW.md

`filter.conditions` 的語法和 [Conditions](../../v8/conditions/conditions_zh-TW.md) 非常類似。唯一的差別是 tupple 內的每一個值必須根據以下排列方式排列。

`[0, 1, 2]`

| 位置 | 說明                                                                                     |
| ---- | ---------------------------------------------------------------------------------------- |
| 0    | 目標控制器的值。若為原始值則留空白字串。                                                 |
| 1    | 運算子，請參閱 [OPERATOR](../../v8/conditions/conditions_zh-TW.md#left-operator-right)。 |
| 2    | 每一個要比對的 `OptionItem`。若為原始值則留空白字串。                                    |

#### 巢狀條件

`conditions` 可支援巢狀結構。

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

## 使用自訂 Observable

如果 `src` 是 `string`，則會當成 key 去 `optionsSources` 內尋找匹配的 Observable 並使用。該 Observable 必須回傳 `OptionItem[]`。

<doc-tab>

<doc-code name="HTML">

```html
<ng-dynamic-json-form ... [optionsSources]="optionsSources"></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```tsx
optionsSources = {
  custom$: this._http.get("https://dummyjson.com/products").pipe(
    map((x) => (x as any).products),
    concatAll(),
    map((x: any) => ({ label: x.title, value: x })),
    toArray()
  ),
};
```

</doc-code>

<doc-code name="Config">

```json
{
	...
	"options": {
		"src": "custom$",
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

選項陣列資料。

#### src

提供以使用動態選項資料。

#### srcAppendPosition

當靜態資料和動態資料同時存在，可用來指定動態資料相對於靜態的位置。

#### autoSelectFirst

選項資料接到之後，自動選擇第一個選項。

#### layout

選項的排版佈局。

#### labelPosition

選項文字的位置。

#### containerClass

選項父層容器的 class。

#### containerStyles

選項父層容器的 style。

### OptionItem

```tsx
export interface OptionItem {
  label: string;
  value?: any;
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

API 網址。

#### method

HTTP 傳輸方法。

#### headers

要加入的 HTTP headers。

#### body

呼叫 API 需帶的參數。

#### mapData

- `labelKey` 用於當作顯示文字的欄位。
- `valueKeys` 用於生成新的物件需要的 key 列表。
- `contentPath` 陣列資料的所在路徑。
- `slice` 將接到的資料切割。

#### trigger

- `by` 需要監聽其 valueChanges 的目標控制器路徑。
- `debounceTime` 需要加入的延遲 (毫秒)。
- `body` HTTP 傳輸需要帶入的參數。

#### filter

- `by` 需要監聽其 valueChanges 的目標控制器路徑。
- `debounceTime` 需要加入的延遲 (毫秒)。
- `conditions` 過濾資料的條件。
