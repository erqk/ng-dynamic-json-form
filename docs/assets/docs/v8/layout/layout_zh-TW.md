# 佈局

## 欄位元件樣式

每個欄位元件的內部元素被拆分為好幾個區塊。它們的層級結構和位置如下圖顯示。每一個區塊可使用對應的 class 或者 inline styles 來調整樣式。

<input-layout-illustration></input-layout-illustration>

要調整某區塊樣式，請在 `layout` 內加入該區塊的 class 或者 styles。

```json
{
	...
	"layout": {
		"hostClass": "...",
		"hostStyles": "...",
		"labelClass": "...",
		"labelStyles": "...",
		...
	}
}
```

如果有設定 `children`，代表此欄位會是一個 FormGroup，因此 "Input Area" 區塊會替換為 "Form Group" 區塊。

<input-layout-illustration is-form-group="true" show-tags="false"></input-layout-illustration>

## 說明文字位置

說明文字的預設位置是 "Label" 之後，"Input Area" 之前。將 `layout.descriptionPosition` 設為 `after` 可將位置調整到 "Input Area" 之前。

<input-layout-illustration description-position="after" show-tags="false"></input-layout-illustration>

## 內容展開/收合

`layout.contentCollapsible`

設定後，點擊標題可將內容展開/收合。此功能必須要有 `label` 存在。設定的值為內容的初始展開/收合狀態。

<doc-form-viewer configs='[{
  "formControlName": "collapsible",
  "label": "標題文字",
  "description": "description...",
  "layout": {
    "contentCollapsible": "collapse",
    "hostClass": "p-4 border border-1 border-[var(--border-color-50)]"
  }
}]'></doc-form-viewer>

## 自動加入 required class

`layout.autoAddRequiredClass`

設為 true 時，若 `validators` 陣列內存在名為 `required` 的驗證器，則標題元素會自動加入 `required` class。預設為 true。

## 隱藏標題文字

`layout.hideLabel`

此功能用於將標題隱藏，但仍然將 `label` 的值傳遞到欄位元件內。例：使用 Angular Material 時，可將此設為 true，避免標題重複顯示。

## API

### FormLayout

```tsx
export interface FormLayout {
  hostClass?: string;
  hostStyles?: string;
  labelClass?: string;
  labelStyles?: string;
  contentClass?: string;
  contentStyles?: string;
  formGroupStyles?: string;
  formGroupClass?: string;
  descriptionClass?: string;
  descriptionStyles?: string;
  inputAreaClass?: string;
  inputAreaStyles?: string;
  errorClass?: string;
  errorStyles?: string;
  descriptionPosition?: "before" | "after";
  hideLabel?: boolean;
  contentCollapsible?: "collapse" | "expand";
  autoAddRequiredClass?: boolean;
}
```
