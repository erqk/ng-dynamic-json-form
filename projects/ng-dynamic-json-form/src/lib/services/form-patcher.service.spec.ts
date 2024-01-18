import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormPatcherService } from './form-patcher.service';
import { TestBed } from '@angular/core/testing';
import { FormControlConfig } from '../models';
import { FormGeneratorService } from './form-generator.service';
import { FormConditionsService } from './form-conditions.service';
import { FormValidationService } from './form-validation.service';

const config: FormControlConfig[] = [
  {
    formControlName: 'nameListA',
    formArray: {
      template: [
        {
          formControlName: 'name',
        },
      ],
    },
  },
  {
    formControlName: 'groupA',
    children: [
      {
        formControlName: 'nameListB',
        formArray: {
          template: [
            {
              formControlName: 'name',
            },
          ],
        },
      },
      {
        formControlName: 'groupB',
        children: [
          {
            formControlName: 'nameListC',
            formArray: {
              template: [
                {
                  formControlName: 'name',
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

const form = new FormGroup({
  nameListA: new FormArray([]),
  groupA: new FormGroup({
    nameListB: new FormArray([]),
    groupB: new FormGroup({
      nameListC: new FormArray([]),
    }),
  }),
});

const formValue = {
  nameListA: [{ name: 'Andrew' }, { name: 'James' }],
  groupA: {
    nameListB: [{ name: 'Thomas' }, { name: 'Mark' }, { name: 'Kenneth' }],
    groupB: {
      nameListC: [
        { name: 'Michelle' },
        { name: 'Amanda' },
        { name: 'Melissa' },
        { name: 'Donna' },
      ],
    },
  },
};

describe('Patch form', () => {
  let service: FormPatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormPatcherService,
        FormGeneratorService,
        FormConditionsService,
        FormValidationService,
      ],
    });

    service = TestBed.inject(FormPatcherService);
    service.config = config;
  });

  it(`Form value is successfully patched, see console for the output`, () => {
    service.patchForm(form, formValue);

    console.group('Form value patch');
    console.log('source', formValue);
    console.log('result', form.value);
    console.groupEnd();

    expect(form.value).toEqual(formValue as any);
  });
});
