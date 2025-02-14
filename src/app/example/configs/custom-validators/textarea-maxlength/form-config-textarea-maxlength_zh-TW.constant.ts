import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_TEXTAREA_MAX_LENGTH_ZHTW: FormControlConfig[] = [
  {
    label: 'Textarea 長度驗證',
    formControlName: 'textareaMaxLength',
    description: '驗證長度，不將換行符號納入計算。',
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
