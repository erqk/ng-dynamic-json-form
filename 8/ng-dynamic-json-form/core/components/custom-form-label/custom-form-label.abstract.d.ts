import { FormLayout } from '../../models/form-layout.interface';
export declare abstract class CustomFormLabel {
    collapsible: boolean;
    expand: boolean;
    label?: string;
    layout?: FormLayout;
    props?: any;
}
