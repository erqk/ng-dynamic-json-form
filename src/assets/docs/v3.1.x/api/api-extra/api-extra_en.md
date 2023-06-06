## Extra

Extra information to configure input element. Some of the properties is not available to some elements.
For example primeng's slider doesn't have tick marks to show, so you need to build your own custom component if you need that.

| type     | property         | description                                               |
| :------- | :--------------- | :-------------------------------------------------------- |
| checkbox | labelPosition    | Label position, `before` \|\| `after`                     |
| -        | -                | -                                                         |
| date     | min              | Earliest date to accept                                   |
|          | max              | Latest date to accept                                     |
|          | selectTime       | Show time picker                                          |
|          | displayFormat    | Date format to display                                    |
|          | outputFormat     | Date format for output value, default is UTC date string. |
| -        | -                | -                                                         |
| radio    | labelPosition    | Label position, `before` \|\| `after`                     |
| -        | -                | -                                                         |
| range    | min              | Minimum value of this range                               |
|          | max              | Maximum value of this range                               |
|          | step             | Step for the slider                                       |
|          | showCurrentValue | Show current value when sliding                           |
|          | showTickMarks    | Show slider tick marks                                    |
| -        | -                | -                                                         |
| switch   | label            | Label for this switch                                     |
|          | labelPosition    | Label position, `before` \|\| `after`                     |
| -        | -                | -                                                         |
| textarea | rows             | Textarea row count                                        |
|          | cols             | Textarea column count                                     |
|          | autoResize       | Enable auto resize on input                               |

> You can set your own `type`, to use it in your custom component.

Example:

```html
<!-- prettier-ignore -->
<ng-container *ngIf="control && data">
  <textarea
    [rows]="data.extra?.textarea?.rows || 5"
    [cols]="data.extra?.textarea?.cols || 30"
    ...
  ></textarea>
</ng-container>
```
