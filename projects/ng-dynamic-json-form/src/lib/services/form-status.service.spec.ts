import { RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormStatusService } from './form-status.service';
import { FormValidatorService } from './form-validator.service';
import { FormControlCondition } from '../models';

const formGroup = new FormGroup({
  address: new FormGroup({
    country: new FormControl(''),
    postcode: new FormControl(''),
    state: new FormControl(''),
  }),
  basicInfo: new FormGroup({
    age: new FormControl(0),
    email: new FormControl(''),
    gender: new FormControl(''),
    name: new FormControl(''),
    showEmail: new FormControl(false),
  }),
  binaryCheckbox: new FormControl(false),
  carBrand: new FormControl(''),
  creditCardTypes: new FormControl([]),
  customComponentControl: new FormControl(''),
  customComponentGroup: new FormControl({}),
  date: new FormControl(''),
  familyMembers: new FormArray([]),
  memo: new FormControl(''),
  temperature: new FormControl(0),
});

describe(`Condition: {name: Andrew, age: 18, showEmail: true, gender: '0'}`, () => {
  let service: FormStatusService;

  const conditionsA: FormControlCondition[] = [
    {
      name: 'required',
      control: 'basicInfo.age',
      controlValue: 20,
      operator: '>',
      groupOperator: '&&',
      groupWith: [
        {
          control: 'basicInfo.name',
          controlValue: 'Andrew',
          operator: '===',
        },
        {
          control: 'basicInfo.showEmail',
          controlValue: false,
          operator: '===',
          groupOperator: '||',
          groupWith: [
            {
              control: 'basicInfo.gender',
              controlValue: '0',
              operator: '===',
            },
          ],
        },
      ],
    },
  ];

  const conditionsB: FormControlCondition[] = [
    {
      name: 'disabled',
      control: 'basicInfo.age',
      controlValue: '50',
      operator: '>',
    },
    {
      name: 'required',
      control: 'basicInfo.age',
      controlValue: '20',
      operator: '>',
    },
    {
      name: 'required',
      control: 'basicInfo.showEmail',
      controlValue: true,
      operator: '===',
    },
  ];

  beforeEach(() => {
    const renderFactory2Spy = jasmine.createSpyObj('RendererFactory2', [
      'createRenderer',
    ]);

    TestBed.configureTestingModule({
      providers: [
        FormStatusService,
        FormValidatorService,
        {
          provide: RendererFactory2,
          useValue: renderFactory2Spy,
        },
      ],
    });

    service = TestBed.inject(FormStatusService);
  });

  const { basicInfo } = formGroup.controls;
  const { name, age, showEmail, gender } = basicInfo.controls;

  name.setValue('Andrew');
  age.setValue(18);
  showEmail.setValue(false);
  gender.setValue('0');

  it(`(name === 'Andrew' && age > 20 && (showEmail === true || gender === '0'))  => false`, () => {
    expect(service['_getConditionsResult'](formGroup, conditionsA)).toBe(false);
  });

  it(`(name === 'Andrew' && age > 20 && (showEmail)) => false`, () => {
    expect(service['_getConditionsResult'](formGroup, conditionsA)).toBe(false);
  });

  it(`(age > 20 || showEmail === true) => false`, () => {
    expect(service['_getConditionsResult'](formGroup, conditionsB)).toBe(false);
  })
});
