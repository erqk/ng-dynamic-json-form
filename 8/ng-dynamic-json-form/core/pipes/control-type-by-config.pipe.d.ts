import { PipeTransform } from '@angular/core';
import { FormControlConfig } from '../models';
import * as i0 from "@angular/core";
export declare class ControlTypeByConfigPipe implements PipeTransform {
    transform(config: FormControlConfig): 'FormControl' | 'FormGroup';
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlTypeByConfigPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ControlTypeByConfigPipe, "controlTypeByConfig", true>;
}
