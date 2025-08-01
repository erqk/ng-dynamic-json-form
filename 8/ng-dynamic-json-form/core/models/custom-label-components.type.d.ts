import { Type } from '@angular/core';
import { CustomFormLabel } from '../components/custom-form-label/custom-form-label.abstract';
export type CustomLabelComponents = {
    [key: string]: Type<CustomFormLabel>;
};
