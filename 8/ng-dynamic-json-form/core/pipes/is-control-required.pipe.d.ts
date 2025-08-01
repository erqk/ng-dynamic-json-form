import { PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class IsControlRequiredPipe implements PipeTransform {
    transform(value: AbstractControl): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsControlRequiredPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsControlRequiredPipe, "isControlRequired", true>;
}
