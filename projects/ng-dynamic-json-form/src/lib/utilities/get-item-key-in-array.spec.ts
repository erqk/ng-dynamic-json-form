import { getValueInObject } from './get-value-in-object';

const caseA = {
  level_1_caseA: {
    level_2_caseA: {
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
  level_1_caseB: {
    level_2_caseB: ['A', 'B', 'C'],
  },
};

describe('getItemKeyInArray', () => {
  it('get 1', () => {
    const index = getValueInObject(
      caseA,
      'level_1_caseA.level_2_caseA.list.["value", "===", 1].value'
    );

    expect(index).toEqual(1);
  });

  it('get "C"', () => {
    const index = getValueInObject(
      caseB,
      'level_1_caseB.level_2_caseB.[,"===", "C"]'
    );
    expect(index).toEqual('C');
  });
});
