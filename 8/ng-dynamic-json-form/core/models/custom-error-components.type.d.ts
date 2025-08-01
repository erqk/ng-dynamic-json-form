import { Type } from '@angular/core';
import { CustomErrorMessage } from '../components/custom-error-message/custom-error-message.abstract';
export type CustomErrorComponents = {
    [key: string]: Type<CustomErrorMessage>;
};
