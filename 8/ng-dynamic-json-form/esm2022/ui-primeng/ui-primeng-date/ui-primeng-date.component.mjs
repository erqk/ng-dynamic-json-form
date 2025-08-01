import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import { Calendar, CalendarModule } from 'primeng/calendar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/calendar";
class UiPrimengDateComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(new Date());
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    updateControl() {
        this._onChange(this.control.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengDateComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiPrimengDateComponent, isStandalone: true, selector: "ui-primeng-date", providers: [
            providePropsBinding([
                {
                    key: 'p-calendar',
                    token: Calendar,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <p-calendar\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-calendar',\n        props: data.props,\n      }\n    ]\"\n    (onClose)=\"updateControl()\"\n  ></p-calendar>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CalendarModule }, { kind: "component", type: i3.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "ariaLabel", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale", "view", "defaultDate"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiPrimengDateComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiPrimengDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-primeng-date', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        CalendarModule,
                        FormsModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'p-calendar',
                                token: Calendar,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <p-calendar\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'p-calendar',\n        props: data.props,\n      }\n    ]\"\n    (onClose)=\"updateControl()\"\n  ></p-calendar>\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcHJpbWVuZy1kYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1wcmltZW5nL3VpLXByaW1lbmctZGF0ZS91aS1wcmltZW5nLWRhdGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGliL3VpLXByaW1lbmcvdWktcHJpbWVuZy1kYXRlL3VpLXByaW1lbmctZGF0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUNwQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBRTVELE1BcUJhLHNCQUF1QixTQUFRLHNCQUFzQjtJQXJCbEU7O1FBd0JXLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FTaEQ7SUFQVSxnQkFBZ0IsQ0FBQyxFQUFPO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7K0dBWFUsc0JBQXNCO21HQUF0QixzQkFBc0IsOERBWHRCO1lBQ1QsbUJBQW1CLENBQUM7Z0JBQ2xCO29CQUNFLEdBQUcsRUFBRSxZQUFZO29CQUNqQixLQUFLLEVBQUUsUUFBUTtpQkFDaEI7YUFDRixDQUFDO1NBQ0gsaURDM0JILGdRQVlBLDJDREVJLFlBQVksa0lBQ1osbUJBQW1CLHlUQUNuQixjQUFjLGt1Q0FDZCxXQUFXLCtCQUNYLHFCQUFxQjs7U0FhWixzQkFBc0I7NEZBQXRCLHNCQUFzQjtrQkFyQmxDLFNBQVM7K0JBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLFdBQVc7d0JBQ1gscUJBQXFCO3FCQUN0QixhQUNVO3dCQUNULG1CQUFtQixDQUFDOzRCQUNsQjtnQ0FDRSxHQUFHLEVBQUUsWUFBWTtnQ0FDakIsS0FBSyxFQUFFLFFBQVE7NkJBQ2hCO3lCQUNGLENBQUM7cUJBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBDdXN0b21Db250cm9sQ29tcG9uZW50LFxuICBQcm9wc0JpbmRpbmdEaXJlY3RpdmUsXG4gIHByb3ZpZGVQcm9wc0JpbmRpbmcsXG59IGZyb20gJ25nLWR5bmFtaWMtanNvbi1mb3JtJztcbmltcG9ydCB7IENhbGVuZGFyLCBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY2FsZW5kYXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1wcmltZW5nLWRhdGUnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ2FsZW5kYXJNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAncC1jYWxlbmRhcicsXG4gICAgICAgIHRva2VuOiBDYWxlbmRhcixcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi91aS1wcmltZW5nLWRhdGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaVByaW1lbmdEYXRlQ29tcG9uZW50IGV4dGVuZHMgQ3VzdG9tQ29udHJvbENvbXBvbmVudCB7XG4gIHByaXZhdGUgX29uQ2hhbmdlPzogYW55O1xuXG4gIG92ZXJyaWRlIGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobmV3IERhdGUoKSk7XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHVwZGF0ZUNvbnRyb2woKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5jb250cm9sLnZhbHVlKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFcIj5cbiAgPHAtY2FsZW5kYXJcbiAgICBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiXG4gICAgW3Byb3BzQmluZGluZ109XCJbXG4gICAgICB7XG4gICAgICAgIGtleTogJ3AtY2FsZW5kYXInLFxuICAgICAgICBwcm9wczogZGF0YS5wcm9wcyxcbiAgICAgIH1cbiAgICBdXCJcbiAgICAob25DbG9zZSk9XCJ1cGRhdGVDb250cm9sKClcIlxuICA+PC9wLWNhbGVuZGFyPlxuPC9uZy1jb250YWluZXI+XG4iXX0=