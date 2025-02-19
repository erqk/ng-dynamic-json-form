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
    const iMask = this._imask;

    iMask.writeValue = (value: string | number) => {
      // ----- Modified area -----
      if (!this._isNumber) {
        this._isNumber = typeof value === 'number';
      }

      value = value == null && iMask.unmask !== 'typed' ? '' : `${value}`;
      // ----- Modified area -----

      if (iMask.maskRef) {
        iMask.beginWrite(value);
        iMask.maskValue = value;
        iMask.endWrite();
      } else {
        iMask['_renderer'].setProperty(iMask.element, 'value', value);
        iMask['_initialValue'] = value;
      }
    };

    iMask['_onAccept'] = () => {
      // ----- Modified area -----
      const valueParsed = this._isNumber
        ? parseFloat(iMask.maskValue)
        : iMask.maskValue;

      const value = isNaN(valueParsed) ? null : valueParsed;
      // ----- Modified area -----

      // if value was not changed during writing don't fire events
      // for details see https://github.com/uNmAnNeR/imaskjs/issues/136
      if (iMask['_writing'] && value === iMask.endWrite()) return;
      iMask.onChange(value);
      iMask.accept.emit(value);
    };
  }
}
