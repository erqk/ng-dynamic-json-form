# Get Started

## Installation

Install `ng-dynamic-json-form` from npm:

```
npm i ng-dynamic-json-form
```

<br>

Next, import `NgDynamicJsonFormComponent` into your standalone component or `NgModule`.

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

Lastly, add the styles into your `angular.json`:

```json
{
  ...
  "styles": [
    ...
    "node_modules/ng-dynamic-json-form/lib/styles/styles.scss",
  ],
}
```

[FormControlConfig]: ../../v4/form-control-config/form-control-config_en.md
[Custom Validators]: ../../v4/validators/validators_en.md#custom-validators
[Custom Components]: ../../v4/custom-components/custom-components_en.md
[Custom UI Components]: ../../v4/custom-components/custom-components_en.md#custom-ui-components
[Layout components and templates]: ../../v4/styling/styling_en.md#layout-components-and-templates
[Custom Components - using &lt;ng-template&gt;]: ../../v4/custom-components/custom-components_en.md#using-ng-template

## @Input

| Property         | Description                                                |
| :--------------- | :--------------------------------------------------------- |
| configs          | JSON string or JavaScript object. See [FormControlConfig]. |
| customValidators | See [Custom Validators].                                   |
| customComponents | See [Custom Components].                                   |
| uiComponents     | See [Custom UI Components].                                |
| layoutComponents | See [Layout components and templates].                     |
| layoutTemplates  | See [Layout components and templates].                     |
| inputTemplates   | See [Custom Components - using &lt;ng-template&gt;].       |

> If `configs` is **JSON string**, it needs to be wrapped:
>
> ```json
> {
>  "configs": [...]
> }
> ```

> JSON Schema: https://raw.githubusercontent.com/erqk/ng-dynamic-json-form/main/projects/ng-dynamic-json-form/src/lib/config-schema.json

## @Output

| Event   | Description                                                                      |
| :------ | :------------------------------------------------------------------------------- |
| formGet | Will get an `UntypedFormGroup`. See [Trigger side effect](#trigger-side-effect). |

## Provider

Besides using `@Input` binding, the data can be provided by using provider `provideNgDynamicJsonForm`. The supported properties are listed below.

| Property         | Description                                       |
| :--------------- | :------------------------------------------------ |
| customValidators | See [Custom Validators].                          |
| customComponents | See [Custom Components].                          |
| uiComponents     | See [Custom UI Components].                       |
| layoutComponents | See [Layout components and templates].            |
| outputDateFormat | Output format for all the dates inside this form. |

```javascript
...
providers: [
  provideNgDynamicJsonForm({
    ...
  }),
],
```

## Form binding

### Bind directly to a FormControl

```javascript
control = new FormControl("");
```

<br>

Method 1:

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [formControl]="control"
></ng-dynamic-json-form>
```

<br>

Method 2:

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [ngModel]="control"
  (ngModelChange)="control.patchValue($event)"
></ng-dynamic-json-form>
```

### Inside an existing FormGroup

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

### Trigger side effect

To trigger side effect using `valueChanges` specific control, we can get the `UntypedFormGroup` generated from the config, using `formGet` event emitter.

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
      tap(x => ...) // side effect
    )
    .subsribe();
}
```
