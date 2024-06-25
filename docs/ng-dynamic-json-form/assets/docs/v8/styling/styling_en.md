# Styling

## Global Variables

The following are CSS variables used by each of the form generated. They are scoped under class `.ng-dynamic-json-form`.

| Variable                | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| --color-primary         | Primary color of the default UI.                     |
| --color-error           | Text color for error message.                        |
| --color-border          | Border color of input.                               |
| --font-family           | Font family to use in the form.                      |
| --font-size-title       | Font size of FormGroup and FormArray.                |
| --font-size-label       | Font size of the input label.                        |
| --font-size-description | Font size of the description.                        |
| --font-size-error       | Font size of the error message.                      |
| --font-weight-title     | Font weight of the title in FormGroup and FormArray. |
| --font-weight-label     | Font weight of the input label.                      |
| --input-border-width    | Border width of the input.                           |
| --column-gap            | Column gap of the form.                              |
| --row-gap               | Row gap of the form.                                 |
| --options-column-gap    | Column gap of the options.                           |
| --options-row-gap       | Row gap of the options.                              |

We can overwrite any of the variable with new value:

```css
.ng-dynamic-json-form {
  --color-primary: teal;
  ...;
}
```