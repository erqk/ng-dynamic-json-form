# Form Array

```javascript
export interface FormArrayConfig {
  templateLabel: string;
  template: FormControlConfig[];
  length?: number;
  editable?: boolean;
  minLength?: number;
  maxLength?: number;
}
```

<table>
  <thead>
    <th>property</th>
    <th>description</th>
  </thead>
  <tbody>
    <tr>
      <td>templateLabel</td>
      <td>
        Label for each <code>FormGroup</code> in this <code>FormArray</code>. You can pass your custom template to overwite.
      </td>
    </tr>
    <tr>
      <td>template</td>
      <td>
        Data to tell how to construct each <code>FormGroup</code> in this <code>FormArray</code>.
      </td>
    </tr>
    <tr>
      <td>length</td>
      <td>
        Numbers of <code>FormGroup</code> to generate at start. If value from this <code>FormArray</code> is provided, it will take the length from value.
      </td>
    </tr>
    <tr>
      <td>editable</td>
      <td>
        Provide button to add or remove item if set to true.
      </td>
    </tr>
    <tr>
      <td>minLength</td>
      <td>
        Minimum length of this <code>FormArray</code>.
      </td>
    </tr>
    <tr>
      <td>maxLength</td>
      <td>
        Maximum length of this <code>FormArray</code>.
      </td>
    </tr>
  </tbody>
</table>

```json
{
  "label": "Family members",
  "formControlName": "familyMembers",
  "value": [],
  "formArray": {
    "length": 1,
    "editable": true,
    "templateLabel": "Member",
    "template": [...]
  }
}
```
