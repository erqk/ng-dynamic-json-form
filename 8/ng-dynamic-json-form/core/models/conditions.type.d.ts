import { ConditionsGroup } from './conditions-group.type';
import { ConditionsActionEnum } from './conditions-action.enum';
export type ConditionType = keyof typeof ConditionsActionEnum | (string & {});
export type Conditions = {
    [key in ConditionType]?: ConditionsGroup;
};
