import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ConditionsGroup } from '../models';
import { FormConditionsService } from './form-conditions.service';
import { FormValidationService } from './form-validation.service';

let service: FormConditionsService;

beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [FormConditionsService, FormValidationService],
  });

  service = TestBed.inject(FormConditionsService);
});

const formGroup = new FormGroup({
  age: new FormControl(0),
  email: new FormControl(''),
  gender: new FormControl(''),
  name: new FormControl(''),
  showEmail: new FormControl(false),
});

const conditionsA: ConditionsGroup = {
  '&&': [
    ['age', '>', 20],
    ['name', '===', 'Andrew'],
    {
      '||': [
        ['showEmail', '===', false],
        ['gender', '===', '0'],
      ],
    },
  ],
};

const conditionsB: ConditionsGroup = {
  '||': [
    ['age', '>', 50],
    ['age', '>', 20],
    ['showEmail', '===', true],
  ],
};

describe('Validate condition result', () => {
  it('Should be `false` if (name === "Andrew" && age > 20 && (showEmail === true || gender === "0"))', () => {
    const result = service['_getConditionsResult'](formGroup, conditionsA);
    expect(result).toBe(false);
  });

  it('Should be `false` if (name === "Andrew" && age > 20 && (showEmail))', () => {
    const result = service['_getConditionsResult'](formGroup, conditionsA);
    expect(result).toBe(false);
  });

  it('Should be `false` if (age > 20 || showEmail === true)', () => {
    const result = service['_getConditionsResult'](formGroup, conditionsB);
    expect(result).toBe(false);
  });
});
