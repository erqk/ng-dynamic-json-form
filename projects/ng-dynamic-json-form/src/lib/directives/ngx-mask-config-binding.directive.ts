import { Directive, Input, SimpleChange, inject } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxMaskConfig } from '../models/ngx-mask-config.interface';

@Directive({
  selector: '[ngxMaskConfigBinding]',
  standalone: true,
})
export class NgxMaskConfigBindingDirective {
  private _maskRef = inject(NgxMaskDirective, { optional: true });

  @Input() ngxMaskConfigBinding?: Partial<NgxMaskConfig>;

  ngOnChanges(): void {
    this._setMaskConfig();
  }

  private _setMaskConfig(): void {
    if (!this._maskRef || !this.ngxMaskConfigBinding) return;

    this._maskRef.validation = false;

    for (const key in this.ngxMaskConfigBinding) {
      if (key === 'mask' || key === 'validation') continue;

      const currentValue = (this.ngxMaskConfigBinding as any)[key];
      const simpleChange = new SimpleChange(undefined, currentValue, true);
      this._maskRef.ngOnChanges({ [key]: simpleChange });
    }
  }
}
