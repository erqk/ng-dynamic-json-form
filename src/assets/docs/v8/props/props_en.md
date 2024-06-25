# Props

Use `props` to bind properties and attributes to the target component or the input element.

To bind the properties:

```html
<p-calendar ... [iconDisplay]="'input'" [showIcon]="true"></p-calendar>
```

Provide them using `props`:

```json
{
  ...
  "type": "date",
  "props": {
    "showIcon": true,
    "iconDisplay": "input"
  }
}
```

## Date

JSON does not support JavaScript Date object. To convert to a JavaScript Date object, pass the value in one of the following forms:

- ISO 8601
- Date string wrapped with `Date(...)`, e.g. `Date(1999/11/11)`

## Custom Components

Since we have the full control over the custom component, auto property binding won’t work initially. But if you need that, you can import `PropsBindingDirective` and provide `PROPS_BINDING_INJECTORS` . This is used internally by `NgDynamicJsonForm` .

<doc-tab>

<doc-code name="HTML">

```html
<p-calendar
  [formControl]="control"
  [propsBinding]="[
    {
      key: 'p-calendar',
      props: data.props,
    }
  ]"
></p-calendar>
```

</doc-code>

<doc-code name="TS">

```tsx
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
	...
  imports: [
	  ...
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'p-calendar',
          token: Calendar,
        },
      ],
    },
  ],
})
export class UiPrimengDateComponent extends CustomControlComponent {
	...
}
```

</doc-code>

</doc-tab>

The `key` is use to match the target to bind the properties. If not provideded, it will bind to the element which the `PropsBindingDirective` is binded.
