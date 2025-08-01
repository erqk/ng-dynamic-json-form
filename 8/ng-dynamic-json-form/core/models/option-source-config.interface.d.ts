import { ConditionsGroup } from './conditions-group.type';
export interface OptionSourceConfig {
    url: string;
    method: 'GET' | 'POST';
    headers?: {
        [key: string]: string | string[];
    };
    body?: {
        [key: string]: any;
    };
    mapData?: {
        labelKey: string;
        valueKeys?: string[];
        contentPath?: string;
        slice?: [number, number];
        appendPosition?: 'after' | 'before';
    };
    trigger?: {
        by: string;
        body: {
            [key: string]: string;
        };
        debounceTime?: number;
    };
    filter?: {
        by: string;
        conditions: ConditionsGroup;
        debounceTime?: number;
    };
}
