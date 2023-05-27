## Custom component

### Build

To build your own custom input element, create a new component and extends it using `NgDynamicJsonFormCustomComponent`.
This component have parameters for your custom component to work.

```javascript
...
export class MyCustomComponent extends NgDynamicJsonFormCustomComponent {}
...
```

> Parameters inside `NgDynamicJsonFormCustomComponent`:
>
> ```javascript
> export class NgDynamicJsonFormCustomComponent {
>   @Input() control: UntypedFormControl | null = null;
>   @Input() data: FormControlConfig | null = null;
> }
> ```

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
ngOnInit(): void {
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
```

### Custom form group component

Or, you can make component that contains a `FormGroup` inside:

```javascript
formGroup = new FormGroup({
  control1: new FormControl(""),
  control2: new FormControl(""),
  control3: new FormControl(""),
});

// Set `control` value on `formGroup` changes
this.formGroup.valueChanges
  .pipe(
    debounceTime(0),
    tap((x) => this.control?.setValue(x))
  )
  .subscribe();

// To sync your `FormGroup` with the `control`
this.control?.valueChanges
  .pipe(
    startWith(this.control.value),
    debounceTime(0),
    tap((x) => {
      // Set emitEvent to false to prevent event trigger for formGroup.valueChanges
      if (this.control?.disabled) this.formGroup.disable({ emitEvent: false });
      if (this.control?.enabled) this.formGroup.enable({ emitEvent: false });
    })
  )
  .subscribe();
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
