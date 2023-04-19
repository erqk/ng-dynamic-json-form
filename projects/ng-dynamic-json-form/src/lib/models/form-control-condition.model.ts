export interface NgDynamicJsonFormControlCondition {
  name?: 'required' | 'disabled' | 'hidden';
  control: string;
  controlValue: any;
  operator: '===' | '!==' | '>=' | '>' | '<=' | '<';
  groupOperator?: '||' | '&&';
  groupWith?: NgDynamicJsonFormControlCondition[];
}