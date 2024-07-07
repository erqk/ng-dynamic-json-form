import { Directive, inject } from '@angular/core';
import { IMaskDirective } from 'angular-imask';

@Directive({
  selector: '[imaskValuePatch]',
  standalone: true,
})
export class ImaskValuePatchDirective {
  private _imask = inject(IMaskDirective);
  private _isNumber = false;

  constructor() {
    this._imask.writeValue = (value: string | number) => {
      if (!this._isNumber) {
        this._isNumber = typeof value === 'number';
      }

      value = value == null && this._imask.unmask !== 'typed' ? '' : `${value}`;

      if (this._imask.maskRef) {
        this._imask.beginWrite(value);
        this._imask.maskValue = value;
        this._imask.endWrite();
      } else {
        this._imask['_renderer'].setProperty(
          this._imask.element,
          'value',
          value
        );
        this._imask['_initialValue'] = value;
      }
    };

    this._imask['_onAccept'] = () => {
      const value = this._isNumber
        ? parseFloat(this._imask.maskValue)
        : this._imask.maskValue;

      // if value was not changed during writing don't fire events
      // for details see https://github.com/uNmAnNeR/imaskjs/issues/136
      if (this._imask['_writing'] && value === this._imask.endWrite()) return;
      this._imask.onChange(value);
      this._imask.accept.emit(value);
    };
  }
}
