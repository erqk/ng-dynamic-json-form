import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_TEXTAREA_MAX_LENGTH_EN: FormControlConfig[] = [
  {
    label: 'Textarea max length validation',
    formControlName: 'textareaMaxLength',
    description: 'Validate the length exclude line break characters.',
    type: 'textarea',
    props: {
      autoResize: true,
    },
    validators: [
      {
        name: 'textareaMaxLength',
        value: 10,
      },
    ],
  },
];
