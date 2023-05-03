export interface FormControlCondition {
  name?: 'required' | 'disabled' | 'hidden' | (string & {});
  control: string;
  controlValue: any;
  operator: '===' | '!==' | '>=' | '>' | '<=' | '<';
  groupOperator?: '||' | '&&';
  groupWith?: FormControlCondition[];
}
