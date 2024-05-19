import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ConditionsGroup, FormControlConfig } from '../models';
import { FormConditionsService } from './form-conditions.service';
import { FormValidationService } from './form-validation.service';
import { GlobalVariableService } from './global-variable.service';

let formConditionsService: FormConditionsService;
let globalVariableService: GlobalVariableService;

beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [
      FormConditionsService,
      FormValidationService,
      GlobalVariableService,
    ],
  });

  globalVariableService = TestBed.inject(GlobalVariableService);
  formConditionsService = TestBed.inject(FormConditionsService);
});

/**Get all controls to listen */
describe('Get all controls to listen', () => {
  const conditionsGroup: ConditionsGroup = {
    '&&': [
      ['level1.age', '>', 20],
      ['level1.name', '===', 'Andrew'],
      {
        '||': [
          ['level1.level2.showEmail', '===', false],
          ['level1.level2.level3.gender', '===', '0'],
        ],
      },
    ],
  };

  const conditionsGroupB: ConditionsGroup = {
    '&&': [
      ['groupB.level1.name', '===', 'Andrew'],
      {
        '||': [
          ['groupB.level1.level2.showEmail', '===', false],
          ['groupB.level1.level2.level3.gender', '===', '0'],
        ],
      },
    ],
  };

  const conditionsGroupC: ConditionsGroup = {
    '&&': [
      ['groupC.level1.age', '>', 20],
      ['groupC.control,obj.prop1', '===', undefined],
      {
        '||': [
          ['groupC.level1.level2.showEmail', '===', false],
          ['groupC.level1.level2.level3.gender', '===', '0'],
        ],
      },
    ],
  };

  it('Should collect all the control paths listed in conditions', () => {
    const result = formConditionsService['_getPathsOfControlsToListen']([
      {
        formControlName: 'a',
        conditions: {
          'control.disabled': conditionsGroup,
          'control.hidden': conditionsGroup,
        },
        children: [
          {
            formControlName: 'a-1',
            conditions: { 'control.disabled': conditionsGroupB },
          },
        ],
      },
      {
        formControlName: 'b',
        children: [
          {
            formControlName: 'bChild',
            conditions: {
              'control.disabled': conditionsGroupC,
            },
          },
        ],
      },
    ]);

    expect(result).toEqual([
      'level1.age',
      'level1.name',
      'level1.level2.showEmail',
      'level1.level2.level3.gender',
      'groupB.level1.name',
      'groupB.level1.level2.showEmail',
      'groupB.level1.level2.level3.gender',
      'groupC.level1.age',
      'groupC.control',
      'groupC.level1.level2.showEmail',
      'groupC.level1.level2.level3.gender',
    ]);
  });
});

/**Get configs that has conditions */
describe('Get configs that has conditions', () => {
  const configs: FormControlConfig[] = [
    {
      formControlName: 'a',
      conditions: {
        'control.disabled': {
          '&&': [
            ['level1.level2.obj', '!==', false],
            ['level1.obj', '!==', 1],
          ],
        },
      },
      children: [
        {
          formControlName: 'a-1',
          children: [
            {
              formControlName: 'a-1-1',
              conditions: {
                'control.disabled': {
                  '&&': [['level1.level2.level3.obj', '!==', false]],
                },
              },
            },
          ],
        },
      ],
    },
    {
      formControlName: 'b',
      children: [
        {
          formControlName: 'b-1',
          conditions: {
            'control.disabled': {
              '&&': [['level1.level2.obj', '!==', false]],
            },
          },
        },
      ],
    },
  ];

  it('Should get 3 configs with conditions', () => {
    const result = formConditionsService['_configsWithConditions'](configs);
    expect(Object.keys(result)).toEqual(['a', 'a.a-1.a-1-1', 'b.b-1']);
  });
});

/**Validate condition result */
describe('Validate condition result', () => {
  const formGroup = new FormGroup({
    age: new FormControl(0),
    email: new FormControl(''),
    gender: new FormControl(''),
    name: new FormControl(''),
    showEmail: new FormControl(false),
  });

  const conditionsGroupA: ConditionsGroup = {
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

  const conditionsGroupB: ConditionsGroup = {
    '||': [
      ['age', '>', 20],
      ['showEmail', '===', true],
    ],
  };

  beforeEach(() => {
    formGroup.reset();
    globalVariableService.rootForm = formGroup;
  });

  it('1. Should be `false` if (name === "Andrew" && age > 20 && (showEmail === false || gender === "0"))', () => {
    formGroup.patchValue({
      name: 'Andrew',
      age: 22,
      showEmail: true,
      gender: '1',
    });

    const result =
      formConditionsService['_evaluateConditionsStatement'](conditionsGroupA);
    expect(result).toBe(false);
  });

  it('2. Should be `true` if (name === "Andrew" && age > 20 && (showEmail === false || gender === "0"))', () => {
    formGroup.patchValue({
      name: 'Andrew',
      age: 22,
      showEmail: true,
      gender: '0',
    });

    const result =
      formConditionsService['_evaluateConditionsStatement'](conditionsGroupA);
    expect(result).toBe(true);
  });

  it('3. Should be `true` if (name === "Andrew" && age > 20 && (showEmail === false || gender === "0"))', () => {
    formGroup.patchValue({
      name: 'Andrew',
      age: 22,
      showEmail: true,
      gender: '0',
    });

    const result =
      formConditionsService['_evaluateConditionsStatement'](conditionsGroupA);
    expect(result).toBe(true);
  });

  it('4. Should be `true` if (age > 20 || showEmail === true)', () => {
    formGroup.patchValue({
      age: 22,
      showEmail: false,
    });

    const result =
      formConditionsService['_evaluateConditionsStatement'](conditionsGroupB);
    expect(result).toBe(true);
  });

  it('5. Should be `true` if (age > 20 || showEmail === true)', () => {
    formGroup.patchValue({
      age: 20,
      showEmail: true,
    });

    const result =
      formConditionsService['_evaluateConditionsStatement'](conditionsGroupB);
    expect(result).toBe(true);
  });
});

/**Execute custom functions */
describe('Execute custom functions', () => {
  let resultA = '';
  let resultB = '';
  const form = new FormGroup({
    a: new FormControl('valueA'),
    b: new FormControl('valueB'),
  });

  const configs: FormControlConfig[] = [
    {
      formControlName: 'a',
      conditions: {
        customAction1: {
          '&&': [['b', '===', 'valueB']],
        },
      },
    },
    {
      formControlName: 'b',
      conditions: {
        customAction2: {
          '&&': [['a', '===', 'valueA']],
        },
      },
    },
  ];

  const customAction1 = () => {
    resultA = 'CUSTOM_ACTION_1:SUCCESS';
  };

  const customAction2 = (c?: AbstractControl) => {
    resultB = `CUSTOM_ACTION_2:SUCCESS_with_${c?.value}`;
  };

  let configsWithConditions: any = null;

  beforeEach(() => {
    resultA = resultB = '';
    globalVariableService.rootForm = form;
    globalVariableService.conditionsActionFuntions = {
      customAction1,
      customAction2,
    };

    configsWithConditions =
      formConditionsService['_configsWithConditions'](configs);
  });

  it('Should execute `customAction1` and set `result` to "CUSTOM_ACTION_1:SUCCESS"', () => {
    formConditionsService['_onConditionsMet'](configsWithConditions);
    expect(resultA).toBe('CUSTOM_ACTION_1:SUCCESS');
  });

  it('Should execute `customAction2` and set `result` to "CUSTOM_ACTION_2:SUCCESS_with_valueB"', () => {
    formConditionsService['_onConditionsMet'](configsWithConditions);
    expect(resultB).toBe('CUSTOM_ACTION_2:SUCCESS_with_valueB');
  });
});
