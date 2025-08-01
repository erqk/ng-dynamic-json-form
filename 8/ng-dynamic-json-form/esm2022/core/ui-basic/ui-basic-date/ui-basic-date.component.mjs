import { CommonModule, formatDate } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
class UiBasicDateComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this._locale = inject(LOCALE_ID);
        this.dateSettings = { min: '', max: '' };
        this.control = new FormGroup({
            date: new FormControl(''),
            time: new FormControl(''),
        });
    }
    writeValue(obj) {
        if (!obj)
            return;
        const dateRaw = formatDate(obj, 'yyyy-MM-dd,HH:mm:ss', this._locale);
        this.control.patchValue({
            date: dateRaw.split(',')[0],
            time: dateRaw.split(',')[1],
        });
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    ngOnInit() {
        const { min, max } = this.data?.props ?? {};
        this.dateSettings = {
            min: !min ? '' : formatDate(min, 'yyyy-MM-dd', this._locale),
            max: !max ? '' : formatDate(max, 'yyyy-MM-dd', this._locale),
        };
    }
    updateControl() {
        const { date, time } = this.control.value;
        if (!date) {
            return;
        }
        const _date = new Date(date);
        if (time) {
            const [hours, minutes, seconds] = time.split(':');
            if (hours)
                _date.setHours(parseInt(hours));
            if (minutes)
                _date.setMinutes(parseInt(minutes));
            if (seconds)
                _date.setSeconds(parseInt(seconds));
        }
        this._onChange(_date);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicDateComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiBasicDateComponent, isStandalone: true, selector: "ui-basic-date", host: { classAttribute: "ui-basic" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"date-input\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n  >\n    <input\n      type=\"date\"\n      [attr.min]=\"dateSettings.min\"\n      [attr.max]=\"dateSettings.max\"\n      [propsBinding]=\"[\n        {\n          props: data.props,\n          omit: ['min', 'max', 'type']\n        }\n      ]\"\n      [formControl]=\"control.controls.date\"\n      (change)=\"updateControl()\"\n    />\n\n    <ng-container *ngIf=\"data?.props?.showTime === true\">\n      <input type=\"time\" [formControl]=\"control.controls.time\" />\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiBasicDateComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiBasicDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-basic-date', standalone: true, imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective], host: {
                        class: 'ui-basic',
                    }, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"date-input\"\n    [ngClass]=\"{\n      disabled: control.disabled\n    }\"\n  >\n    <input\n      type=\"date\"\n      [attr.min]=\"dateSettings.min\"\n      [attr.max]=\"dateSettings.max\"\n      [propsBinding]=\"[\n        {\n          props: data.props,\n          omit: ['min', 'max', 'type']\n        }\n      ]\"\n      [formControl]=\"control.controls.date\"\n      (change)=\"updateControl()\"\n    />\n\n    <ng-container *ngIf=\"data?.props?.showTime === true\">\n      <input type=\"time\" [formControl]=\"control.controls.time\" />\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYmFzaWMtZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWIvY29yZS91aS1iYXNpYy91aS1iYXNpYy1kYXRlL3VpLWJhc2ljLWRhdGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbGliL2NvcmUvdWktYmFzaWMvdWktYmFzaWMtZGF0ZS91aS1iYXNpYy1kYXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFFekQsTUFVYSxvQkFDWCxTQUFRLHNCQUFzQjtJQVhoQzs7UUFjVSxZQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR3BDLGlCQUFZLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUUzQixZQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDL0IsSUFBSSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUN6QixJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO1NBQzFCLENBQUMsQ0FBQztLQTBDSjtJQXhDVSxVQUFVLENBQUMsR0FBUTtRQUMxQixJQUFJLENBQUMsR0FBRztZQUFFLE9BQU87UUFFakIsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDdEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVEsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDbEIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDNUQsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDN0QsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUUxQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELElBQUksS0FBSztnQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksT0FBTztnQkFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksT0FBTztnQkFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDOytHQXJEVSxvQkFBb0I7bUdBQXBCLG9CQUFvQixzSUNoQmpDLHVvQkEwQkEsMkNEakJZLFlBQVksZ09BQUUsbUJBQW1CLDBrQkFBRSxxQkFBcUI7O1NBT3ZELG9CQUFvQjs0RkFBcEIsb0JBQW9CO2tCQVZoQyxTQUFTOytCQUNFLGVBQWUsY0FDYixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUMsUUFHN0Q7d0JBQ0osS0FBSyxFQUFFLFVBQVU7cUJBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgTE9DQUxFX0lELCBPbkluaXQsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEN1c3RvbUNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2N1c3RvbS1jb250cm9sL2N1c3RvbS1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9wc0JpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktYmFzaWMtZGF0ZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIFByb3BzQmluZGluZ0RpcmVjdGl2ZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi91aS1iYXNpYy1kYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAndWktYmFzaWMnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBVaUJhc2ljRGF0ZUNvbXBvbmVudFxuICBleHRlbmRzIEN1c3RvbUNvbnRyb2xDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgcHJpdmF0ZSBfbG9jYWxlID0gaW5qZWN0KExPQ0FMRV9JRCk7XG4gIHByaXZhdGUgX29uQ2hhbmdlPzogYW55O1xuXG4gIGRhdGVTZXR0aW5ncyA9IHsgbWluOiAnJywgbWF4OiAnJyB9O1xuXG4gIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgRm9ybUdyb3VwKHtcbiAgICBkYXRlOiBuZXcgRm9ybUNvbnRyb2woJycpLFxuICAgIHRpbWU6IG5ldyBGb3JtQ29udHJvbCgnJyksXG4gIH0pO1xuXG4gIG92ZXJyaWRlIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuO1xuXG4gICAgY29uc3QgZGF0ZVJhdyA9IGZvcm1hdERhdGUob2JqLCAneXl5eS1NTS1kZCxISDptbTpzcycsIHRoaXMuX2xvY2FsZSk7XG4gICAgdGhpcy5jb250cm9sLnBhdGNoVmFsdWUoe1xuICAgICAgZGF0ZTogZGF0ZVJhdy5zcGxpdCgnLCcpWzBdLFxuICAgICAgdGltZTogZGF0ZVJhdy5zcGxpdCgnLCcpWzFdLFxuICAgIH0pO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMuZGF0YT8ucHJvcHMgPz8ge307XG4gICAgdGhpcy5kYXRlU2V0dGluZ3MgPSB7XG4gICAgICBtaW46ICFtaW4gPyAnJyA6IGZvcm1hdERhdGUobWluLCAneXl5eS1NTS1kZCcsIHRoaXMuX2xvY2FsZSksXG4gICAgICBtYXg6ICFtYXggPyAnJyA6IGZvcm1hdERhdGUobWF4LCAneXl5eS1NTS1kZCcsIHRoaXMuX2xvY2FsZSksXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZUNvbnRyb2woKTogdm9pZCB7XG4gICAgY29uc3QgeyBkYXRlLCB0aW1lIH0gPSB0aGlzLmNvbnRyb2wudmFsdWU7XG5cbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBfZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXG4gICAgaWYgKHRpbWUpIHtcbiAgICAgIGNvbnN0IFtob3VycywgbWludXRlcywgc2Vjb25kc10gPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgICBpZiAoaG91cnMpIF9kYXRlLnNldEhvdXJzKHBhcnNlSW50KGhvdXJzKSk7XG4gICAgICBpZiAobWludXRlcykgX2RhdGUuc2V0TWludXRlcyhwYXJzZUludChtaW51dGVzKSk7XG4gICAgICBpZiAoc2Vjb25kcykgX2RhdGUuc2V0U2Vjb25kcyhwYXJzZUludChzZWNvbmRzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fb25DaGFuZ2UoX2RhdGUpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJkYXRlLWlucHV0XCJcbiAgICBbbmdDbGFzc109XCJ7XG4gICAgICBkaXNhYmxlZDogY29udHJvbC5kaXNhYmxlZFxuICAgIH1cIlxuICA+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICBbYXR0ci5taW5dPVwiZGF0ZVNldHRpbmdzLm1pblwiXG4gICAgICBbYXR0ci5tYXhdPVwiZGF0ZVNldHRpbmdzLm1heFwiXG4gICAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgICAge1xuICAgICAgICAgIHByb3BzOiBkYXRhLnByb3BzLFxuICAgICAgICAgIG9taXQ6IFsnbWluJywgJ21heCcsICd0eXBlJ11cbiAgICAgICAgfVxuICAgICAgXVwiXG4gICAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbC5jb250cm9scy5kYXRlXCJcbiAgICAgIChjaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcbiAgICAvPlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGE/LnByb3BzPy5zaG93VGltZSA9PT0gdHJ1ZVwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0aW1lXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2wuY29udHJvbHMudGltZVwiIC8+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=