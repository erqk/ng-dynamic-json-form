export interface FormControlCondition {
  name?: 'required' | 'disabled' | 'hidden';
  control: string;
  controlValue: any;
  operator: '===' | '!==' | '>=' | '>' | '<=' | '<';
  groupOperator?: '||' | '&&';
  groupWith?: FormControlCondition[];
}