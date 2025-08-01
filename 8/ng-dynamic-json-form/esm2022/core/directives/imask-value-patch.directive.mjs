import { Directive, inject } from '@angular/core';
import { IMaskDirective } from 'angular-imask';
import * as i0 from "@angular/core";
class ImaskValuePatchDirective {
    constructor() {
        this._imask = inject(IMaskDirective);
        this._isNumber = false;
        const iMask = this._imask;
        iMask.writeValue = (value) => {
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
            }
            else {
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
            if (iMask['_writing'] && value === iMask.endWrite())
                return;
            iMask.onChange(value);
            iMask.accept.emit(value);
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ImaskValuePatchDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: ImaskValuePatchDirective, isStandalone: true, selector: "[imaskValuePatch]", ngImport: i0 }); }
}
export { ImaskValuePatchDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ImaskValuePatchDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[imaskValuePatch]',
                    standalone: true,
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hc2stdmFsdWUtcGF0Y2guZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvZGlyZWN0aXZlcy9pbWFzay12YWx1ZS1wYXRjaC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFL0MsTUFJYSx3QkFBd0I7SUFJbkM7UUFIUSxXQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUxQixLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1lBQzVDLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7YUFDNUM7WUFFRCxLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDO1lBQ3BFLDRCQUE0QjtZQUU1QixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDOUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNoQztRQUNILENBQUMsQ0FBQztRQUVGLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDeEIsNEJBQTRCO1lBQzVCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTO2dCQUNoQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBRXBCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDdEQsNEJBQTRCO1lBRTVCLDREQUE0RDtZQUM1RCxpRUFBaUU7WUFDakUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQUUsT0FBTztZQUM1RCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQztJQUNKLENBQUM7K0dBekNVLHdCQUF3QjttR0FBeEIsd0JBQXdCOztTQUF4Qix3QkFBd0I7NEZBQXhCLHdCQUF3QjtrQkFKcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmUgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2ltYXNrVmFsdWVQYXRjaF0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJbWFza1ZhbHVlUGF0Y2hEaXJlY3RpdmUge1xuICBwcml2YXRlIF9pbWFzayA9IGluamVjdChJTWFza0RpcmVjdGl2ZSk7XG4gIHByaXZhdGUgX2lzTnVtYmVyID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgaU1hc2sgPSB0aGlzLl9pbWFzaztcblxuICAgIGlNYXNrLndyaXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgLy8gLS0tLS0gTW9kaWZpZWQgYXJlYSAtLS0tLVxuICAgICAgaWYgKCF0aGlzLl9pc051bWJlcikge1xuICAgICAgICB0aGlzLl9pc051bWJlciA9IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gdmFsdWUgPT0gbnVsbCAmJiBpTWFzay51bm1hc2sgIT09ICd0eXBlZCcgPyAnJyA6IGAke3ZhbHVlfWA7XG4gICAgICAvLyAtLS0tLSBNb2RpZmllZCBhcmVhIC0tLS0tXG5cbiAgICAgIGlmIChpTWFzay5tYXNrUmVmKSB7XG4gICAgICAgIGlNYXNrLmJlZ2luV3JpdGUodmFsdWUpO1xuICAgICAgICBpTWFzay5tYXNrVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaU1hc2suZW5kV3JpdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlNYXNrWydfcmVuZGVyZXInXS5zZXRQcm9wZXJ0eShpTWFzay5lbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgIGlNYXNrWydfaW5pdGlhbFZhbHVlJ10gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaU1hc2tbJ19vbkFjY2VwdCddID0gKCkgPT4ge1xuICAgICAgLy8gLS0tLS0gTW9kaWZpZWQgYXJlYSAtLS0tLVxuICAgICAgY29uc3QgdmFsdWVQYXJzZWQgPSB0aGlzLl9pc051bWJlclxuICAgICAgICA/IHBhcnNlRmxvYXQoaU1hc2subWFza1ZhbHVlKVxuICAgICAgICA6IGlNYXNrLm1hc2tWYWx1ZTtcblxuICAgICAgY29uc3QgdmFsdWUgPSBpc05hTih2YWx1ZVBhcnNlZCkgPyBudWxsIDogdmFsdWVQYXJzZWQ7XG4gICAgICAvLyAtLS0tLSBNb2RpZmllZCBhcmVhIC0tLS0tXG5cbiAgICAgIC8vIGlmIHZhbHVlIHdhcyBub3QgY2hhbmdlZCBkdXJpbmcgd3JpdGluZyBkb24ndCBmaXJlIGV2ZW50c1xuICAgICAgLy8gZm9yIGRldGFpbHMgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91Tm1Bbk5lUi9pbWFza2pzL2lzc3Vlcy8xMzZcbiAgICAgIGlmIChpTWFza1snX3dyaXRpbmcnXSAmJiB2YWx1ZSA9PT0gaU1hc2suZW5kV3JpdGUoKSkgcmV0dXJuO1xuICAgICAgaU1hc2sub25DaGFuZ2UodmFsdWUpO1xuICAgICAgaU1hc2suYWNjZXB0LmVtaXQodmFsdWUpO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==