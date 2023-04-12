export interface NgDynamicJsonFormControlCondition {
  name: 'required' | 'disabled' | 'hidden';
  control: string;
  controlValue: any;
  operator: '===' | '!==' | '>=' | '>' | '<=' | '<';
  childBoolOperator?: 'OR' | 'AND';
  children?: NgDynamicJsonFormControlCondition[];
}

/**
 * if (xxx.xxx.xx === 'a' || xxx.xxx.xx > 10 || (xx.xx === 0 && xxxx.xx === 1)) {
 *   ...addValidators([])
 * }
 *
 * true || false || (true && false)
 * true || false || false
 * true
 *
 * true || false || true && false  ===> true
 * (true || false || true) && false ===> false
 *
 *
 * [
 *  {
 *    "name": "hidden",
 *    "control": "basicInfo.status",
 *    "controlValue": false,
 *    "operand": "===",
 *    "children": [
 *      {
 *        "control": "basicInfo.status",
 *        "controlValue": false,
 *        "operand": "===",
 *      }
 *    ]
 *  }
 * ]
 *
 *
 * if (triggerType === 'GREATER') {
 *  if (control.value > triggerValue) {
 *
 *  }
 * }
 *
 * if (condition === 'AND') {
 *  if (xxx.xx.)
 * }
 *
 * https://stackoverflow.com/questions/2041435/dynamic-javascript-if-statement
 *
 * type: required | disabled | hide
 *
 */
