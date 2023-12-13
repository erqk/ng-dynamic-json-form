import {
  Directive,
  Input,
  SimpleChange,
  ViewChild,
  inject,
} from '@angular/core';
import { NgxMaskConfig } from '../models/ngx-mask-config.interface';
import { NgxMaskDirective } from 'ngx-mask';

@Directive({
  selector: '[ngxMaskConfigBinding]',
  standalone: true,
})
export class NgxMaskConfigBindingDirective {
  private _maskRef = inject(NgxMaskDirective);
  @Input() ngxMaskConfigBinding?: Partial<NgxMaskConfig>;

  ngAfterViewInit(): void {
    // Bypass NG0100
    window.setTimeout(() => this._setMaskConfig());
  }

  private _setMaskConfig(): void {
    if (!this._maskRef || !this.ngxMaskConfigBinding) return;

    this._maskRef.validation = false;

    for (const key in this.ngxMaskConfigBinding) {
      if (key === 'mask') continue;

      const currentValue = (this.ngxMaskConfigBinding as any)[key];
      const simpleChange = new SimpleChange(undefined, currentValue, true);

      this._maskRef.ngOnChanges({ [key]: simpleChange });
    }
  }
}
