# Change log

## 5.4.0

### Feature

- Add support for custom label.

## 5.3.3

### Fix

- Refactor the logic to make control touched and set the touch state manually for select component.

## 5.3.2

### Feature

- Auto add 'required' class to form title if has Validators.required.

### Chore

- Use [ngClass] to toggle 'readonly' class.

## 5.3.1

### Fix

- Change detection not trigger correctly. Should use `markForCheck()` instead of `detectChanges()`.

## 5.3.0

### Chore

- Remove `outputDateFormat` from `NG_DYNAMIC_JSON_FORM_CONFIG`.

## 5.2.20

### Fix

- Replace all spaces in formControlName otherwise the condition will fail to execute.

## 5.2.18

### Chore

- Reduce error message subscription count.

## 5.2.17

### Fix

- Object value parse incorrectly.

## 5.2.16

### Feature

- Enable filter of array in object by key.

### Fix

- OptionsTrigger not working correctly when using dynamic params.

## 5.2.15

### Fix

- Query selector failed because the "." character is not escape well.

## 5.2.14

### Fix

- Use default value for params if not provided during POST request.

## 5.2.13

### Fix

- Failed to fetch data for POST method and params is not dynamic.

## 5.2.12

### Fix

- Http request cache using new params value.
- For request by trigger, check the validity of the value.

## 5.2.11

### Chore

- Write value into control even it's null or undefined.

## 5.2.10

### Fix

- `autoSelectFirst` not working on static data

## 5.2.9

### Fix

- OptionTrigger params failed on POST method.

## 5.2.8

### Fix

- `markAsDirty()`, `markAsTouched()` not working for input templates.
- Add `takeUntilDestroy()` to errors listener inside CustomControlComponent to prevent memory leak.

## 5.2.7

### Fix

- Nullable check.

## 5.2.6

## Fix

- Mark form control and form pristine after form is built.

## 5.2.5

### Fix

- All controls should be pristine after the form is built.

## 5.2.4

### Fix

- Use native setProperty() because style variable cannot be applied using Renderer2.

## 5.2.3

### Fix

- Style not applied correctly.

### Feature

- Add support for styling of error messages.

## 5.2.2

### Fix

- Move content styles of form control to inner level
- Avoid overwriting of existing styles

## 5.2.1

### Chore

- Code refactor

## 5.2.0

### Fix

- Form errors is not updating if no ControlValueAccessor is used.
- ControlLayoutDirective needs to work even if no layout is provided.

### Feature

- Auto select first for option items.

## 5.1.9

### Fix

- Options source http request won't complete when when there's connection keep-alive in request headers.
  - Workaround: replace http request with Subject to trigger the complete event.

### Chore

- Form input margin adjustment.

## 5.1.8

### Chore

- Revert provideNgDynamicJsonForm() provider set to multi. The behavior is not match with the expectation and cause other problems.

## 5.1.7

### Fix

- Target element to apply contentStyles and contentClass.

### Chore

- Set provideNgDynamicJsonForm() provider to multi.

## 5.1.6

### Feature

- Add 'includes', 'notIncludes' to condition type.

### Fix

- The logic to show warning message if no config provided.

### Chore

- Reduce uneccessary trigger of change detection.

## 5.1.4

### Feature

- Allow usage of custom FormTitleComponent even if `contentCollapsible` is not set.

## 5.1.3

### Fix

- .grid-container align-items should not be `flex-end`. This will break the alignment when error messages occured.

## 5.1.2

### Feature

- Pass `layout` property into FormTitle custom template

## 5.1.1

### Fix

- `extra` property not pass into FormTitleComponent.

## 5.1.0

### Feature

- Add `extra` property to form title.

## 5.0.13

### Chore

- Prevent re-validation and re-compile of ajv schema to increase performance.

## 5.0.12

### Fix

- CustomControlComponent `setErrors()` logic.

## 5.0.11

### Fix

- `writeValue()` data mapping.

## 5.0.10

### Fix

- Control prestine and dirty state.
- Memory leaks caused by Ajv class instantiated multiple times.
- Style default ui input border color on errors.

### Feature

- Form title custom template add `expand` and `collapsible` variable.

## 5.0.9

### Fix

- Form title initial expand state.

## 5.0.6

### Feature

- Add property `collapsibleState` to toggle all collapsible together.

## 5.0.5

### Fix

- `hideErrorMessage` toggle logic.
- Control element flex alignment in row.

## 5.0.4

### Fix

- Form is not build when `hideErrorMessage` is set to true.

## 5.0.3

### Feature

- Add `hideErrorMessage` input to control the show/hide of all error messages.

## 5.0.2

### Fix

- Validation errors is always null when bind using ControlValueAccessor.

## 5.0.1

### Fix

- `contentClass` and `contentStyles` not correctly injected into FormGroup.

## 5.0.0

### Feature

- Support class and inline styles for content of each FormControl, FormGroup and FormArray.

### Changes

- FormLayout: Rename `childClass` to `contentClass`.
- FormLayout: Rename `childStyles` to `contentStyles`.
- FormLayout: Rename `childCollapsible` to `contentCollapsible`.

## 4.0.5

### Feature

- `layout.childCollapsible` supports FormControl.

### Fix

- FormTitleComponent: `overflow:hidden` should be remove once the `collapsibleEl` is fully expanded.

## 4.0.4

### Fix

- FormTitleComponent does not unsubscribe the event.

### Feature

- Improve CustomControlComponent resuability by allowing null service provider.

## 4.0.2

### Fix

- Validation errors not showing, if `customValidators` is not set.

## 4.0.0

### Feature

- Add schema validation for `configs` before building the form.
- Add support for dynamic options data
- Add support for custom input templates, custom error message, custom loading
- Add provider support
- Use `OnPush` strategy to improve performance
- More dynamic and flexible property binding via `extra`.

### Fix

- Conditions not getting the correct result.
- Conditions inside FormArray will only work for last one if multiple FormArray exists.

## 3.4.1

### Fix

- Conditions extracted is not correct

## 3.4.0

### Feature

- Support custom template for FormArray's group header.
  1. Fully customize group header using ng-template
  2. Access all the needed data using template variable

### Fix

- #50 UI native: slider tooltip position misaligned

## 3.3.0

### Feature

- Provide methods to mimic same behavior as ControlValueAccessor to reduce boilerplate.

### Fix

- Missing disabled style for native HTML element #30
- Duplicated input components #44
- Element content overflow issue when there is pre tag inside #45

## 3.2.0

### Feature

- Add `range`, `date` input type.

### Chore

- Add server-side check

  Some function is calling browser specific API, so we do nothing if it's server-side to prevent error.

- `NgDynamicJsonFormCustomComponent` is now carry validation errors.

## 3.1.5

### Fix

- Input validation error should not have mask

  For the input that using `mask` directive, the `validation` is set to false, there shouldn't be any mask errors output.

## 3.1.4

### Fix

- Form not generate on Safari version below 16.3

  The use of positive lookbehind regular expression is not well supported. Use the other way to achieve same result.

## 3.1.0

### Feature

- Description is now using `pre-wrap` to process white space.
- Group element specific property in `extra` using their `type`.
- Able to add label to switch.
- Able to change option's label position.
- Native textarea now support auto resize.

## 3.0.0

### Fix

- Use more reliable way to determine whether the UI component is Angular Material using information form type `UiComponents`.

### Feature

- Update type `UiComponents`, enable it to carry more information

## 2.0.1

### Fix

- Add the missing description field in form group and form array
- Hide error message if it's Angular Material

## 2.0.0

### Feature

- Implement masked input with ngx-mask
- `jsonData` input can accepts JSON string
- Add Angular Material UI components

### Chore

- Remove the use of NgModule
- Upgrade to Angular 16
- Rename input field `customUIComponentList` to `uiComponents`
- Add `UiComponents` type

## 1.0.0

- First release
