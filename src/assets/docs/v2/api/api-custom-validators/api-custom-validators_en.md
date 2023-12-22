## Custom validators

You can build your own powerful custom validators, and putting them into a constant:

```javascript
/**
 * @type {{
 *  [key: string]: ValidatorFn
 * }}
 */
customValidators = {
  firstUppercase: firstUppercaseValidator,
  ...
};
```

Then, in your template, bind it to the input `customValidators`:

<!-- prettier-ignore -->
```HTML
<ng-dynamic-json-form
 ...
 [customValidators]="customValidators"
></ng-dynamic-json-form>
```

Finally, you can choose which custom validator to use by specify the `value` to match the `key` inside `customValidators` we create just now.

```javascript
{
  "validators": [
    {
      "name": "custom",
      "value": "firstUppercase"
    }
  ],
  ...
}
```
