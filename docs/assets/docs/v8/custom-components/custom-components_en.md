# Custom Components

Use custom component to build complex form for the control.

## Create a custom component

For example, we need a component that can handle file input. First, create a component called `InputFileComponent` and extends it with `CustomControlComponent` , then override the `control` and assign it with an instance of `AbstractControl`.

<doc-code>

```ts
import { CustomControlComponent } from 'ng-dynamic-json-form';

@Component({...})
export class InputFileComponent extends CustomControlComponent {
	override control = new FormControl<File | null>(null);
}
```

</doc-code>

> The `CustomControlComponent` implements [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor) and [Validator](https://angular.io/api/forms/Validator). The `control` is use to connect with the parent control. Hence, it is strongly recommended to use `control` to bind with the FormGroup or FormControl in this component, so we don’t need to rewrite the logic inside the methods `writeValue()` and `registerOnChange()`.
>
> <doc-code enable-copy="false">
>
> ```ts
> @Component({...})
> export class CustomControlComponent implements ControlValueAccessor, Validator {
> 	...
> 	writeValue(obj: any): void {
>     this.control?.patchValue(obj);
>   }
> 	registerOnChange(fn: any): void {
> 	  this.control?.valueChanges.subscribe(fn);
> 	}
> }
> ```
>
> </doc-code>
>
> **NOTE** It's not neccessary to provide `NG_VALUE_ACCESSOR` and `NG_VALIDATORS`, if the component is only use inside the `NgDynamicJsonFormComponent`

Next, bind the `control` to the input and add `input` event listener.

<doc-tab>
<doc-code name="HTML">

```html
<input type="file" [formControl]="control" (input)="onFileSelect($event)" />
```

</doc-code>

<doc-code name="TS">

```ts
onFileSelect(e: Event): void {
  if (this.control.disabled) return;

  const input = e.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);

  input.value = '';

  if (files.length > 0) {
	  this.control.setValue(files[0]);
  }
}
```

</doc-code>
</doc-tab>

> There is `data` property that’s use to provide the config for this component.
>
> <doc-code enable-copy="false">
>
> <!-- prettier-ignore -->
> ```html
> @if (!data?.readonly) {
>     <input type="file" [formControl]="control" (input)="onFileSelect($event)" />
> } @else {
>     <span>{{ control.value.name }}</span>
> }
> ```
>
> </doc-code>
>
> For other properties, use `data.props` property. See [Props](../../v8/props/props_en.md).
>
> <doc-code enable-copy="false">
>
> <!-- prettier-ignore -->
> ```html
> <input type="file"
>   [formControl]="control"
>   [accept]="data?.props?.accept ?? '*'"
>   (input)="onFileSelect($event)"
> />
> ```
>
> </doc-code>

### Use custom component in the form

Now our `InputFileComponent` is ready to use as a custom component. Add it to the `customComponents` , and if any of the `formControlName` is matched with the key inside `customComponents` , that component will be use for that control.

<doc-tab>
<doc-code name="HTML">

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="configs"
  [customComponents]="customComponents"
></ng-dynamic-json-form>
```

</doc-code>

<doc-code name="TS">

```ts
export class AppComponent {
  configs: FormControlConfig[] = [
    {
      formControlName: "name",
      label: "Name",
    },
    {
      formControlName: "inputFile",
      label: "File upload",
    },
  ];

  customComponents: CustomComponents = {
    inputFile: InputFileComponent,
  };
}
```

</doc-code>
</doc-tab>

## API

### Properties

#### control

The control to bind with the view and connect with the parent form. Can be assigned with any of the `FormControl`, `FormGroup` or `FormArray`.

#### data

The config for this component.

#### hideErrorMessage

The `hideErrorMessage` value from root component. This is useful to control the visibility of errors.

### Methods

#### onOptionsGet

Call after the options is successfully fetched from API endpoint. Override to take control of how and when the data should be used.

```ts
onOptionsGet(data: OptionItem[]): void {
  if (!this.data || !this.data.options) {
    return;
  }

  this.data.options.data = data;
}
```

#### markAsDirty

```ts
markAsDirty(): void {}
```

#### markAsTouched

```ts
markAsTouched(): void {}
```

#### setErrors()

```ts
setErrors(errors: ValidationErrors | null): void {}
```

## Using ng-template

Sometimes, if creating a component is way too much, we can use ng-template.

<doc-code>

<!-- prettier-ignore -->
```html
<ng-dynamic-json-form
  [configs]="..."
  [customTemplates]="{
    inputFile: inputFileTemplate
  }"
>
  <ng-template #inputFileTemplate let-control="control" let-data="data">
    @if (!data?.readonly) {
      <input type="file" [formControl]="control" (input)="onFileSelect($event)" />
    } @else {
      <span>{{ control.value.name }}</span>
    }
  </ng-template>
</ng-dynamic-json-form>
```

</doc-code>

The variables available for the ng-template are:

| Name             | Type              | Description                                          |
| ---------------- | ----------------- | ---------------------------------------------------- |
| control          | AbstractControl   | The FormControl for this input.                      |
| data             | FormControlConfig | The config for this input.                           |
| hideErrorMessage | boolean           | The value of `hideErrorMessage` from root component. |
