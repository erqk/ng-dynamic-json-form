export interface NgDynamicJsonFormCondition {
  name?: 'required' | 'disabled' | 'hidden';
  control: string;
  controlValue: any;
  operator: '===' | '!==' | '>=' | '>' | '<=' | '<';
  groupOperator?: '||' | '&&';
  groupWith?: NgDynamicJsonFormCondition[];
}