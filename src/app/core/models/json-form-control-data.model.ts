import { JsonFormGroupData } from "./json-form-group-data.model";

export interface JsonFormControlData {
    label: string;
    value: any;
    validators?: string[];
    child?: JsonFormGroupData;
}