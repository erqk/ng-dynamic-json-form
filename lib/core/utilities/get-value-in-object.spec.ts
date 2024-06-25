import { getValueInObject } from './get-value-in-object';

const caseA = {
  level1_A: {
    level2_A: {
      list: [
        {
          value: 0,
        },
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ],
    },
  },
};

const caseB = {
  level1_B: {
    level2_B: ['A', 'B', 'C'],
  },
};

const caseC = {
  level1_C: {
    level2_C1: {},
    level2_C2: {
      level3_C: {
        value: 'LEVEL_3_C_VALUE',
      },
    },
    level2_C3: {},
  },
};

describe('getValueInObject', () => {
  it('level1_A.level2_A.list.["value", "===", 1].value === 1', () => {
    const index = getValueInObject(
      caseA,
      'level1_A.level2_A.list.["value", "===", 1].value'
    );

    expect(index).toEqual(1);
  });

  it('level1_B.level2_B.[,"===", "C"] === "C"', () => {
    const index = getValueInObject(caseB, 'level1_B.level2_B.[,"===", "C"]');
    expect(index).toEqual('C');
  });

  it('level1_C.level2_C2.level3_C.value === "LEVEL_3_C_VALUE"', () => {
    const value = getValueInObject(caseC, 'level1_C.level2_C2.level3_C.value');
    expect(value).toBe('LEVEL_3_C_VALUE');
  });
});
