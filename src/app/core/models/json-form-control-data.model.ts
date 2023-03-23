import { JsonFormGroupData } from "./json-form-group-data.model";

export interface JsonFormControlData {
    label: string;
    value: any;
    valueType?: string;
    validators?: string[];
    child?: JsonFormGroupData;
}