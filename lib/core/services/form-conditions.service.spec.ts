import { RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormControlGroupCondition } from '../models';
import { FormConditionsService } from './form-conditions.service';
import { FormValidationService } from './form-validation.service';

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

const conditionsA: FormControlGroupCondition = {
  '&&': [
    ['basicInfo.age', '>', 20],
    ['basicInfo.name', '===', 'Andrew'],
    {
      '||': [
        ['basicInfo.showEmail', '===', false],
        ['basicInfo.gender', '===', '0'],
      ],
    },
  ],
};

const conditionsB: FormControlGroupCondition = {
  '||': [
    ['basicInfo.age', '>', 50],
    ['basicInfo.age', '>', 20],
    ['basicInfo.showEmail', '===', true],
  ],
};

describe(`Condition: {name: Andrew, age: 18, showEmail: true, gender: '0'}`, () => {
  let service: FormConditionsService;

  beforeEach(() => {
    const renderFactory2Spy = jasmine.createSpyObj('RendererFactory2', [
      'createRenderer',
    ]);

    TestBed.configureTestingModule({
      providers: [
        FormConditionsService,
        FormValidationService,
        {
          provide: RendererFactory2,
          useValue: renderFactory2Spy,
        },
      ],
    });

    service = TestBed.inject(FormConditionsService);
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
  });
});
