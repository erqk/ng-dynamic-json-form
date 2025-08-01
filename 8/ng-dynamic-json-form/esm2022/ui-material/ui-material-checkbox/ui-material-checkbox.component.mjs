import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxModule, } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/checkbox";
class UiMaterialCheckboxComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new FormArray([]);
    }
    writeValue(obj) {
        this.control.clear();
        if (Array.isArray(obj)) {
            obj.forEach((x) => this._addItem(x));
        }
        else {
            this._addItem(obj);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    toggle(e) {
        const checked = e.checked;
        this._onChange(checked);
    }
    onCheckboxChange(e, index) {
        const checked = e.checked;
        const value = this.data?.options?.data
            ?.map((x) => x.value)
            .filter((val, i) => (i === index ? checked : this.isChecked(val)));
        this.control.clear();
        value?.forEach((x) => this._addItem(x));
        this._onChange(this.control.value);
    }
    isChecked(val) {
        return this.control.value.some((x) => JSON.stringify(x) === JSON.stringify(val));
    }
    get groupButtonsStyles() {
        return `
      flex-direction: ${this.data?.options?.layout ?? 'row'};
      align-items: flex-start;
      ${this.data?.options?.containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
    }
    _addItem(val) {
        const control = new FormControl(val);
        this.control.push(control);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialCheckboxComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialCheckboxComponent, isStandalone: true, selector: "ui-material-checkbox", providers: [
            providePropsBinding([
                {
                    key: 'mat-checkbox',
                    token: MatCheckbox,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n  >\n    <!-- binary checkbox -->\n    <ng-container *ngIf=\"data.options && data.options.data?.length === 1\">\n      <mat-checkbox\n        [checked]=\"!control.value.length ? false : control.value[0]\"\n        [disabled]=\"control.disabled\"\n        [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n        [propsBinding]=\"[\n          {\n            key: 'mat-checkbox',\n            props: data.props,\n            omit: ['labelPosition']\n          }\n        ]\"\n        (change)=\"toggle($event)\"\n        >{{ data.options.data?.[0]?.label }}</mat-checkbox\n      >\n    </ng-container>\n\n    <!-- muli-select checkbox -->\n    <ng-container\n      *ngIf=\"data.options && data.options.data && data.options.data.length > 1\"\n    >\n      <ng-container *ngFor=\"let item of data.options.data; index as i\">\n        <mat-checkbox\n          [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n          [checked]=\"isChecked(item.value)\"\n          [disabled]=\"control.disabled\"\n          [propsBinding]=\"[\n            {\n              key: 'mat-checkbox',\n              props: data.props,\n              omit: ['labelPosition', 'checked', 'disabled', 'value']\n            }\n          ]\"\n          (change)=\"onCheckboxChange($event, i)\"\n          >{{ item.label }}</mat-checkbox\n        >\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i2.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialCheckboxComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-checkbox', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatCheckboxModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-checkbox',
                                token: MatCheckbox,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <div\n    class=\"group-buttons\"\n    [style]=\"groupButtonsStyles\"\n    [ngClass]=\"[data.options?.containerClass ?? '']\"\n  >\n    <!-- binary checkbox -->\n    <ng-container *ngIf=\"data.options && data.options.data?.length === 1\">\n      <mat-checkbox\n        [checked]=\"!control.value.length ? false : control.value[0]\"\n        [disabled]=\"control.disabled\"\n        [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n        [propsBinding]=\"[\n          {\n            key: 'mat-checkbox',\n            props: data.props,\n            omit: ['labelPosition']\n          }\n        ]\"\n        (change)=\"toggle($event)\"\n        >{{ data.options.data?.[0]?.label }}</mat-checkbox\n      >\n    </ng-container>\n\n    <!-- muli-select checkbox -->\n    <ng-container\n      *ngIf=\"data.options && data.options.data && data.options.data.length > 1\"\n    >\n      <ng-container *ngFor=\"let item of data.options.data; index as i\">\n        <mat-checkbox\n          [labelPosition]=\"data.options.labelPosition ?? 'after'\"\n          [checked]=\"isChecked(item.value)\"\n          [disabled]=\"control.disabled\"\n          [propsBinding]=\"[\n            {\n              key: 'mat-checkbox',\n              props: data.props,\n              omit: ['labelPosition', 'checked', 'disabled', 'value']\n            }\n          ]\"\n          (change)=\"onCheckboxChange($event, i)\"\n          >{{ item.label }}</mat-checkbox\n        >\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3VpLW1hdGVyaWFsL3VpLW1hdGVyaWFsLWNoZWNrYm94L3VpLW1hdGVyaWFsLWNoZWNrYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1jaGVja2JveC91aS1tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdFLE9BQU8sRUFDTCxXQUFXLEVBRVgsaUJBQWlCLEdBQ2xCLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUNwQixNQUFNLHNCQUFzQixDQUFDOzs7O0FBRTlCLE1BcUJhLDJCQUE0QixTQUFRLHNCQUFzQjtJQXJCdkU7O1FBd0JXLFlBQU8sR0FBRyxJQUFJLFNBQVMsQ0FBYyxFQUFFLENBQUMsQ0FBQztLQWtEbkQ7SUFoRFUsVUFBVSxDQUFDLEdBQVE7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NB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L2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUNvbnRyb2wsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNYXRDaGVja2JveCxcbiAgTWF0Q2hlY2tib3hDaGFuZ2UsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1tYXRlcmlhbC1jaGVja2JveCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBQcm9wc0JpbmRpbmdEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVQcm9wc0JpbmRpbmcoW1xuICAgICAge1xuICAgICAgICBrZXk6ICdtYXQtY2hlY2tib3gnLFxuICAgICAgICB0b2tlbjogTWF0Q2hlY2tib3gsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktbWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaU1hdGVyaWFsQ2hlY2tib3hDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21Db250cm9sQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBfb25DaGFuZ2U/OiBhbnk7XG5cbiAgb3ZlcnJpZGUgY29udHJvbCA9IG5ldyBGb3JtQXJyYXk8Rm9ybUNvbnRyb2w+KFtdKTtcblxuICBvdmVycmlkZSB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jb250cm9sLmNsZWFyKCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICBvYmouZm9yRWFjaCgoeCkgPT4gdGhpcy5fYWRkSXRlbSh4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FkZEl0ZW0ob2JqKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgdG9nZ2xlKGU6IE1hdENoZWNrYm94Q2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3QgY2hlY2tlZCA9IGUuY2hlY2tlZDtcbiAgICB0aGlzLl9vbkNoYW5nZShjaGVja2VkKTtcbiAgfVxuXG4gIG9uQ2hlY2tib3hDaGFuZ2UoZTogTWF0Q2hlY2tib3hDaGFuZ2UsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjaGVja2VkID0gZS5jaGVja2VkO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRhPy5vcHRpb25zPy5kYXRhXG4gICAgICA/Lm1hcCgoeCkgPT4geC52YWx1ZSlcbiAgICAgIC5maWx0ZXIoKHZhbCwgaSkgPT4gKGkgPT09IGluZGV4ID8gY2hlY2tlZCA6IHRoaXMuaXNDaGVja2VkKHZhbCkpKTtcblxuICAgIHRoaXMuY29udHJvbC5jbGVhcigpO1xuICAgIHZhbHVlPy5mb3JFYWNoKCh4KSA9PiB0aGlzLl9hZGRJdGVtKHgpKTtcbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLmNvbnRyb2wudmFsdWUpO1xuICB9XG5cbiAgaXNDaGVja2VkKHZhbDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbC52YWx1ZS5zb21lKFxuICAgICAgKHgpID0+IEpTT04uc3RyaW5naWZ5KHgpID09PSBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICAgKTtcbiAgfVxuXG4gIGdldCBncm91cEJ1dHRvbnNTdHlsZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgZmxleC1kaXJlY3Rpb246ICR7dGhpcy5kYXRhPy5vcHRpb25zPy5sYXlvdXQgPz8gJ3Jvdyd9O1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAke3RoaXMuZGF0YT8ub3B0aW9ucz8uY29udGFpbmVyU3R5bGVzID8/ICcnfVxuICAgIGAucmVwbGFjZSgvXFxzezIsfS9nLCAnJyk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRJdGVtKHZhbD86IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodmFsKTtcbiAgICB0aGlzLmNvbnRyb2wucHVzaChjb250cm9sKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFcIj5cbiAgPGRpdlxuICAgIGNsYXNzPVwiZ3JvdXAtYnV0dG9uc1wiXG4gICAgW3N0eWxlXT1cImdyb3VwQnV0dG9uc1N0eWxlc1wiXG4gICAgW25nQ2xhc3NdPVwiW2RhdGEub3B0aW9ucz8uY29udGFpbmVyQ2xhc3MgPz8gJyddXCJcbiAgPlxuICAgIDwhLS0gYmluYXJ5IGNoZWNrYm94IC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhLm9wdGlvbnMgJiYgZGF0YS5vcHRpb25zLmRhdGE/Lmxlbmd0aCA9PT0gMVwiPlxuICAgICAgPG1hdC1jaGVja2JveFxuICAgICAgICBbY2hlY2tlZF09XCIhY29udHJvbC52YWx1ZS5sZW5ndGggPyBmYWxzZSA6IGNvbnRyb2wudmFsdWVbMF1cIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbC5kaXNhYmxlZFwiXG4gICAgICAgIFtsYWJlbFBvc2l0aW9uXT1cImRhdGEub3B0aW9ucy5sYWJlbFBvc2l0aW9uID8/ICdhZnRlcidcIlxuICAgICAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgICAgICB7XG4gICAgICAgICAgICBrZXk6ICdtYXQtY2hlY2tib3gnLFxuICAgICAgICAgICAgcHJvcHM6IGRhdGEucHJvcHMsXG4gICAgICAgICAgICBvbWl0OiBbJ2xhYmVsUG9zaXRpb24nXVxuICAgICAgICAgIH1cbiAgICAgICAgXVwiXG4gICAgICAgIChjaGFuZ2UpPVwidG9nZ2xlKCRldmVudClcIlxuICAgICAgICA+e3sgZGF0YS5vcHRpb25zLmRhdGE/LlswXT8ubGFiZWwgfX08L21hdC1jaGVja2JveFxuICAgICAgPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPCEtLSBtdWxpLXNlbGVjdCBjaGVja2JveCAtLT5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdJZj1cImRhdGEub3B0aW9ucyAmJiBkYXRhLm9wdGlvbnMuZGF0YSAmJiBkYXRhLm9wdGlvbnMuZGF0YS5sZW5ndGggPiAxXCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGEub3B0aW9ucy5kYXRhOyBpbmRleCBhcyBpXCI+XG4gICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICBbbGFiZWxQb3NpdGlvbl09XCJkYXRhLm9wdGlvbnMubGFiZWxQb3NpdGlvbiA/PyAnYWZ0ZXInXCJcbiAgICAgICAgICBbY2hlY2tlZF09XCJpc0NoZWNrZWQoaXRlbS52YWx1ZSlcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sLmRpc2FibGVkXCJcbiAgICAgICAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiAnbWF0LWNoZWNrYm94JyxcbiAgICAgICAgICAgICAgcHJvcHM6IGRhdGEucHJvcHMsXG4gICAgICAgICAgICAgIG9taXQ6IFsnbGFiZWxQb3NpdGlvbicsICdjaGVja2VkJywgJ2Rpc2FibGVkJywgJ3ZhbHVlJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hlY2tib3hDaGFuZ2UoJGV2ZW50LCBpKVwiXG4gICAgICAgICAgPnt7IGl0ZW0ubGFiZWwgfX08L21hdC1jaGVja2JveFxuICAgICAgICA+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==