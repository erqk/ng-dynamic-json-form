import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/select";
import * as i5 from "@angular/material/core";
class UiMaterialSelectComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormControl(-1);
        this.onTouched = () => { };
    }
    writeValue(obj) {
        const index = this.data?.options?.data
            ?.map((x) => x.value)
            .findIndex((x) => JSON.stringify(x) === JSON.stringify(obj)) ?? -1;
        this.control.setValue(index);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    updateControl() {
        const index = this.control.value ?? -1;
        if (index > -1) {
            const value = this.data?.options?.data?.map((x) => x.value)?.[index];
            this._onChange(value);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSelectComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialSelectComponent, isStandalone: true, selector: "ui-material-select", providers: [
            providePropsBinding([
                {
                    key: 'mat-select',
                    token: MatSelect,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n    <mat-select\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-select',\n          props: data.props,\n        }\n      ]\"\n      (openedChange)=\"onTouched()\"\n      (selectionChange)=\"updateControl()\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-option [value]=\"i\">{{ item.label }}</mat-option>\n      </ng-container>\n    </mat-select>\n  </mat-form-field>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatLabel, selector: "mat-label" }, { kind: "component", type: i4.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex", "panelWidth", "hideSingleSelectionIndicator"], exportAs: ["matSelect"] }, { kind: "component", type: i5.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialSelectComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-select', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatSelectModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-select',
                                token: MatSelect,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-form-field>\n    <mat-label>{{ data.label }}</mat-label>\n    <mat-select\n      [formControl]=\"control\"\n      [propsBinding]=\"[\n        {\n          key: 'mat-select',\n          props: data.props,\n        }\n      ]\"\n      (openedChange)=\"onTouched()\"\n      (selectionChange)=\"updateControl()\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-option [value]=\"i\">{{ item.label }}</mat-option>\n      </ng-container>\n    </mat-select>\n  </mat-form-field>\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1zZWxlY3QvdWktbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1zZWxlY3QvdWktbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNwQixNQUFNLHNCQUFzQixDQUFDOzs7Ozs7O0FBRTlCLE1Bb0JhLHlCQUEwQixTQUFRLHNCQUFzQjtJQXBCckU7O1FBdUJXLFlBQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLGNBQVMsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7S0EyQnRCO0lBekJVLFVBQVUsQ0FBQyxHQUFRO1FBQzFCLE1BQU0sS0FBSyxHQUNULElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUk7WUFDdEIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDcEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRVEsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRVEsaUJBQWlCLENBQUMsRUFBTztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7K0dBL0JVLHlCQUF5QjttR0FBekIseUJBQXlCLGlFQVh6QjtZQUNULG1CQUFtQixDQUFDO2dCQUNsQjtvQkFDRSxHQUFHLEVBQUUsWUFBWTtvQkFDakIsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCO2FBQ0YsQ0FBQztTQUNILGlEQzFCSCxra0JBb0JBLDJDRE5JLFlBQVksK1BBQ1osbUJBQW1CLHlUQUNuQixlQUFlLG9rQkFDZixxQkFBcUI7O1NBYVoseUJBQXlCOzRGQUF6Qix5QkFBeUI7a0JBcEJyQyxTQUFTOytCQUNFLG9CQUFvQixjQUNsQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YscUJBQXFCO3FCQUN0QixhQUNVO3dCQUNULG1CQUFtQixDQUFDOzRCQUNsQjtnQ0FDRSxHQUFHLEVBQUUsWUFBWTtnQ0FDakIsS0FBSyxFQUFFLFNBQVM7NkJBQ2pCO3lCQUNGLENBQUM7cUJBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFNlbGVjdCwgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZ1xufSBmcm9tICduZy1keW5hbWljLWpzb24tZm9ybSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLW1hdGVyaWFsLXNlbGVjdCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgUHJvcHNCaW5kaW5nRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUHJvcHNCaW5kaW5nKFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWF0LXNlbGVjdCcsXG4gICAgICAgIHRva2VuOiBNYXRTZWxlY3QsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgVWlNYXRlcmlhbFNlbGVjdENvbXBvbmVudCBleHRlbmRzIEN1c3RvbUNvbnRyb2xDb21wb25lbnQge1xuICBwcml2YXRlIF9vbkNoYW5nZT86IGFueTtcblxuICBvdmVycmlkZSBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKC0xKTtcblxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBvdmVycmlkZSB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPVxuICAgICAgdGhpcy5kYXRhPy5vcHRpb25zPy5kYXRhXG4gICAgICAgID8ubWFwKCh4KSA9PiB4LnZhbHVlKVxuICAgICAgICAuZmluZEluZGV4KCh4KSA9PiBKU09OLnN0cmluZ2lmeSh4KSA9PT0gSlNPTi5zdHJpbmdpZnkob2JqKSkgPz8gLTE7XG5cbiAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUoaW5kZXgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgdXBkYXRlQ29udHJvbCgpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY29udHJvbC52YWx1ZSA/PyAtMTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGF0YT8ub3B0aW9ucz8uZGF0YT8ubWFwKCh4KSA9PiB4LnZhbHVlKT8uW2luZGV4XTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhXCI+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LWxhYmVsPnt7IGRhdGEubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICA8bWF0LXNlbGVjdFxuICAgICAgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIlxuICAgICAgW3Byb3BzQmluZGluZ109XCJbXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICdtYXQtc2VsZWN0JyxcbiAgICAgICAgICBwcm9wczogZGF0YS5wcm9wcyxcbiAgICAgICAgfVxuICAgICAgXVwiXG4gICAgICAob3BlbmVkQ2hhbmdlKT1cIm9uVG91Y2hlZCgpXCJcbiAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGEub3B0aW9ucz8uZGF0YTsgaW5kZXggYXMgaVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwiaVwiPnt7IGl0ZW0ubGFiZWwgfX08L21hdC1vcHRpb24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L21hdC1zZWxlY3Q+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==