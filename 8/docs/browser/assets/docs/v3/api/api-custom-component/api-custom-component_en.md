## Custom component

### Build

To build your own custom input element, create a new component and extends it using `NgDynamicJsonFormCustomComponent`.
This component have properties for your custom component to work:

```javascript
export class NgDynamicJsonFormCustomComponent {
  public control: UntypedFormControl | null = null;
  public data: FormControlConfig | null = null;
  public viewControl?: AbstractControl;
  public errors$?: Observable<string[]>;

  readControlValue(obj: any): void {}
  registerControlChange(fn: any): void {}
  controlDisabled(isDisabled: boolean): void {}
  registerControlTouched(isTouched: boolean): void {}
}
```

```javascript
...
export class MyCustomComponent extends NgDynamicJsonFormCustomComponent {}
...
```

### Properties

| property    | description                                                            |
| :---------- | :--------------------------------------------------------------------- |
| control     | The control to communicate with the root form.                         |
| data        | The config of this control.                                            |
| viewControl | Use this control to manipulate value before write to the main control. |
| errors$     | This control's validation errors.                                      |

<br>

### Methods

The usage of the methods is same with the `ControlValueAcessor`'s implementation. See the <a href="https://angular.io/api/forms/ControlValueAccessor" target="_blank">Angular docs</a>.

| method                 | description                                                       |
| :--------------------- | :---------------------------------------------------------------- |
| readControlValue       | Same behavior with `writeValue` from ControlValueAccessor.        |
| registerControlChange  | Same behavior with `registerOnChange` from ControlValueAccessor.  |
| controlDisabled        | Same behavior with `setDisabledState` from ControlValueAccessor.  |
| registerControlTouched | Same behavior with `registerOnTouched` from ControlValueAccessor. |

> **Important:** All the methods above are called in `ngOnInit()`. So you must call `super.ngOnInit()` if you override `ngOnInit()` to make them works as expected.

Now, you can build whatever type of input element you want!

### Custom checkbox component

For simple input element like multiple checkboxes, you can setup like below:

In your template:

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

In your component:

```javascript
...
override ngOnInit(): void {
  super.ngOnInit();
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
...
```

### Custom form group component

Or, you can make component that contains a `FormGroup` inside, in such case, you can use `viewControl` to simplify your work. When the value of this `FormGroup` changes, the main `FormControl` will also get updated.

```javascript
...
override viewControl = new FormGroup({
  control1: new FormControl(''),
  control2: new FormControl(''),
  control3: new FormControl(''),
});
```

### Custom date component

This shows how to work with the methods provided, to interact with form that different from the main control, like what we're doing when implement `ControlValueAccessor`:

```javascript
...
public override viewControl = new FormGroup({
  date: new FormControl(''),
  time: new FormControl(''),
});

override readControlValue(obj: any): void {
  if (!obj) return;

  const dateRaw = formatDate(obj, 'yyyy-MM-dd,HH:mm:ss', this.locale);
  this.viewControl.patchValue({
    date: dateRaw.split(',')[0],
    time: dateRaw.split(',')[1],
  });
}

override registerControlChange(fn: any): void {
  this.viewControl.valueChanges
    .pipe(
      filter((x) => !!x.date && !!x.time),
      map(() => this.dateTimeFormatted)
    )
    .subscribe(fn);
}
...
```

### Usage

In your component, declare a variable to store all your custom components:

```javascript
customComponents = {
  "custom-input": MyCustomInputComponent,
};
```

Then bind it to the `customComponents`:

```HTML
<ng-dynamic-json-form
  ...
  [customComponents]="customComponents"
></ng-dynamic-json-form>
```

`ng-dynamic-json-form` will find the matching component using `customComponent` in the JSON data:

```javascript
{
  "customComponent": "custom-input",
  ...
},
```
