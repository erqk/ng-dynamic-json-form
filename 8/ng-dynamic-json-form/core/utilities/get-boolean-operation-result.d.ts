import { ConditionsOperator } from '../models/conditions-operator.type';
export declare function evaluateBooleanOperation([left, operator, right]: [
    any,
    ConditionsOperator,
    any
]): boolean;
