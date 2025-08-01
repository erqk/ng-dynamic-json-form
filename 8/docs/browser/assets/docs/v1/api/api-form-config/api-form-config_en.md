## JSON data keys

```javascript
jsonData: FormControlConfig[] = [
  {
    label: ...,
    formControlName: ...,
    value: ...,
    placeholder: ...,
    description: ...,
    type: ...,
    validators: [],
    conditions: [],
    options: [],
    optionsLayout: ...,
    cssGrid: {},
    children: [],
    formArray: {},
    customComponent: ...,
    extra: {}
  },
  ...
]
```

| key             | Description                                            |
| :-------------- | :----------------------------------------------------- |
| label           | Label for this input element.                          |
| formControlName | Name for this `AbstractControl`.                       |
| value           | Use as the initial value of the `AbstractControl`.     |
| placeholder     | Placeholder for the input.                             |
| description     | Description under label of this input element.         |
| type            | Type of input element to create                        |
| options         | An array with `label` and `value`,                     |
| optionsLayout   | `row` \|\| `column`. Use together with `options`       |
| cssGrid         | CSS grid options to layout form.                       |
| customComponent | Key of the target component in `customComponents` list |
| extra           | Extra information for the input element                |
| children        | Provide to create as `FormGroup`.                      |
| formArray       | Provide to create as `FormArray`.                      |
