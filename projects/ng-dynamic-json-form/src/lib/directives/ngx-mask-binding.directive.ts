import { Directive, Input, SimpleChange, inject } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxMaskConfig } from '../models/ngx-mask-config.interface';

@Directive({
  selector: '[ngxMaskBinding]',
  standalone: true,
})
export class NgxMaskBindingDirective {
  private _maskRef = inject(NgxMaskDirective, { optional: true });

  @Input() ngxMaskBinding?: Partial<NgxMaskConfig>;

  ngOnChanges(): void {
    this._setMaskConfig();
  }

  private _setMaskConfig(): void {
    if (!this._maskRef || !this.ngxMaskBinding) return;

    this._maskRef.validation = false;

    for (const key in this.ngxMaskBinding) {
      if (key === 'mask') continue;

      const currentValue = (this.ngxMaskBinding as any)[key];
      const simpleChange = new SimpleChange(undefined, currentValue, true);
      this._maskRef.ngOnChanges({ [key]: simpleChange });
    }
  }
}
