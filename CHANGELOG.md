# 3.2.0

### Feature

- Add `range`, `date` input type.

### Chore

- Add server-side check

  Some function is calling browser specific API, so we do nothing if it's server-side to prevent error.

- `NgDynamicJsonFormCustomComponent` is now carry validation errors.

# 3.1.5

### Fix

- Input validation error should not have mask

  For the input that using `mask` directive, the `validation` is set to false, there shouldn't be any mask errors output.

# 3.1.4

### Fix

- Form not generate on Safari version below 16.3

  The use of positive lookbehind regular expression is not well supported. Use the other way to achieve same result.

# 3.1.0

### Feature

- Description is now using `pre-wrap` to process white space.
- Group element specific property in `extra` using their `type`.
- Able to add label to switch.
- Able to change option's label position.
- Native textarea now support auto resize.

# 3.0.0

### Fix

- Use more reliable way to determine whether the UI component is Angular Material using information form type `UiComponents`.

### Feature

- Update type `UiComponents`, enable it to carry more information

# 2.0.1

### Fix

- Add the missing description field in form group and form array
- Hide error message if it's Angular Material

# 2.0.0

### Feature

- Implement masked input with ngx-mask
- `jsonData` input can accepts JSON string
- Add Angular Material UI components

### Chore

- Remove the use of NgModule
- Upgrade to Angular 16
- Rename input field `customUIComponentList` to `uiComponents`
- Add `UiComponents` type

# 1.0.0

- First release
