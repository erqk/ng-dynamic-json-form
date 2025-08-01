import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { CustomControlComponent, PropsBindingDirective, providePropsBinding, } from 'ng-dynamic-json-form';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/radio";
class UiMaterialRadioComponent extends CustomControlComponent {
    constructor() {
        super(...arguments);
        this.control = new UntypedFormControl('');
        this.selectedIndex = -1;
    }
    writeValue(obj) {
        this.selectedIndex =
            this.data?.options?.data
                ?.map((x) => x.value)
                .findIndex((x) => JSON.stringify(x) === JSON.stringify(obj)) ?? -1;
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    onChange(i) {
        const value = this.data?.options?.data?.[i].value;
        this._onChange(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialRadioComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: UiMaterialRadioComponent, isStandalone: true, selector: "ui-material-radio", providers: [
            providePropsBinding([
                {
                    key: 'mat-radio-group',
                    token: MatRadioGroup,
                },
            ]),
        ], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"data\">\n  <mat-radio-group\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-radio-group',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n  >\n    <div\n      class=\"group-buttons\"\n      [style]=\"data.options?.containerStyles\"\n      [ngClass]=\"[data.options?.containerClass ?? '']\"\n      [ngStyle]=\"{\n        'flex-direction': data.options?.layout\n      }\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-radio-button\n          [value]=\"i\"\n          [checked]=\"selectedIndex === i\"\n          (change)=\"onChange(i)\"\n          >{{ item.label }}</mat-radio-button\n        >\n      </ng-container>\n    </div>\n  </mat-radio-group>\n</ng-container>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatRadioModule }, { kind: "directive", type: i3.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }, { kind: "component", type: i3.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: PropsBindingDirective, selector: "[propsBinding]", inputs: ["propsBinding"] }] }); }
}
export { UiMaterialRadioComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UiMaterialRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-material-radio', standalone: true, imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatRadioModule,
                        MatInputModule,
                        PropsBindingDirective,
                    ], providers: [
                        providePropsBinding([
                            {
                                key: 'mat-radio-group',
                                token: MatRadioGroup,
                            },
                        ]),
                    ], template: "<ng-container *ngIf=\"data\">\n  <mat-radio-group\n    [labelPosition]=\"data.options?.labelPosition ?? 'after'\"\n    [formControl]=\"control\"\n    [propsBinding]=\"[\n      {\n        key: 'mat-radio-group',\n        props: data.props,\n        omit: ['labelPosition']\n      }\n    ]\"\n  >\n    <div\n      class=\"group-buttons\"\n      [style]=\"data.options?.containerStyles\"\n      [ngClass]=\"[data.options?.containerClass ?? '']\"\n      [ngStyle]=\"{\n        'flex-direction': data.options?.layout\n      }\"\n    >\n      <ng-container *ngFor=\"let item of data.options?.data; index as i\">\n        <mat-radio-button\n          [value]=\"i\"\n          [checked]=\"selectedIndex === i\"\n          (change)=\"onChange(i)\"\n          >{{ item.label }}</mat-radio-button\n        >\n      </ng-container>\n    </div>\n  </mat-radio-group>\n</ng-container>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWF0ZXJpYWwtcmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3VpLW1hdGVyaWFsL3VpLW1hdGVyaWFsLXJhZGlvL3VpLW1hdGVyaWFsLXJhZGlvLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYi91aS1tYXRlcmlhbC91aS1tYXRlcmlhbC1yYWRpby91aS1tYXRlcmlhbC1yYWRpby5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFFOUIsTUFxQmEsd0JBQXlCLFNBQVEsc0JBQXNCO0lBckJwRTs7UUF3QlcsWUFBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsa0JBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztLQWlCcEI7SUFmVSxVQUFVLENBQUMsR0FBUTtRQUMxQixJQUFJLENBQUMsYUFBYTtZQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJO2dCQUN0QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDcEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRVEsZ0JBQWdCLENBQUMsRUFBTztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxDQUFDLENBQVM7UUFDaEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQzsrR0FwQlUsd0JBQXdCO21HQUF4Qix3QkFBd0IsZ0VBWHhCO1lBQ1QsbUJBQW1CLENBQUM7Z0JBQ2xCO29CQUNFLEdBQUcsRUFBRSxpQkFBaUI7b0JBQ3RCLEtBQUssRUFBRSxhQUFhO2lCQUNyQjthQUNGLENBQUM7U0FDSCxpREM1QkgsMDJCQStCQSwyQ0RoQkksWUFBWSxrYkFDWixtQkFBbUIseVRBQ25CLGNBQWMsMFJBQ2QsY0FBYywrQkFDZCxxQkFBcUI7O1NBYVosd0JBQXdCOzRGQUF4Qix3QkFBd0I7a0JBckJwQyxTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxxQkFBcUI7cUJBQ3RCLGFBQ1U7d0JBQ1QsbUJBQW1CLENBQUM7NEJBQ2xCO2dDQUNFLEdBQUcsRUFBRSxpQkFBaUI7Z0NBQ3RCLEtBQUssRUFBRSxhQUFhOzZCQUNyQjt5QkFDRixDQUFDO3FCQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRSYWRpb0dyb3VwLCBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7XG4gIEN1c3RvbUNvbnRyb2xDb21wb25lbnQsXG4gIFByb3BzQmluZGluZ0RpcmVjdGl2ZSxcbiAgcHJvdmlkZVByb3BzQmluZGluZyxcbn0gZnJvbSAnbmctZHluYW1pYy1qc29uLWZvcm0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1tYXRlcmlhbC1yYWRpbycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBQcm9wc0JpbmRpbmdEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVQcm9wc0JpbmRpbmcoW1xuICAgICAge1xuICAgICAgICBrZXk6ICdtYXQtcmFkaW8tZ3JvdXAnLFxuICAgICAgICB0b2tlbjogTWF0UmFkaW9Hcm91cCxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi91aS1tYXRlcmlhbC1yYWRpby5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW10sXG59KVxuZXhwb3J0IGNsYXNzIFVpTWF0ZXJpYWxSYWRpb0NvbXBvbmVudCBleHRlbmRzIEN1c3RvbUNvbnRyb2xDb21wb25lbnQge1xuICBwcml2YXRlIF9vbkNoYW5nZT86IGFueTtcblxuICBvdmVycmlkZSBjb250cm9sID0gbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJyk7XG4gIHNlbGVjdGVkSW5kZXggPSAtMTtcblxuICBvdmVycmlkZSB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID1cbiAgICAgIHRoaXMuZGF0YT8ub3B0aW9ucz8uZGF0YVxuICAgICAgICA/Lm1hcCgoeCkgPT4geC52YWx1ZSlcbiAgICAgICAgLmZpbmRJbmRleCgoeCkgPT4gSlNPTi5zdHJpbmdpZnkoeCkgPT09IEpTT04uc3RyaW5naWZ5KG9iaikpID8/IC0xO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIG9uQ2hhbmdlKGk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRhPy5vcHRpb25zPy5kYXRhPy5baV0udmFsdWU7XG4gICAgdGhpcy5fb25DaGFuZ2UodmFsdWUpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICA8bWF0LXJhZGlvLWdyb3VwXG4gICAgW2xhYmVsUG9zaXRpb25dPVwiZGF0YS5vcHRpb25zPy5sYWJlbFBvc2l0aW9uID8/ICdhZnRlcidcIlxuICAgIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCJcbiAgICBbcHJvcHNCaW5kaW5nXT1cIltcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWF0LXJhZGlvLWdyb3VwJyxcbiAgICAgICAgcHJvcHM6IGRhdGEucHJvcHMsXG4gICAgICAgIG9taXQ6IFsnbGFiZWxQb3NpdGlvbiddXG4gICAgICB9XG4gICAgXVwiXG4gID5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImdyb3VwLWJ1dHRvbnNcIlxuICAgICAgW3N0eWxlXT1cImRhdGEub3B0aW9ucz8uY29udGFpbmVyU3R5bGVzXCJcbiAgICAgIFtuZ0NsYXNzXT1cIltkYXRhLm9wdGlvbnM/LmNvbnRhaW5lckNsYXNzID8/ICcnXVwiXG4gICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6IGRhdGEub3B0aW9ucz8ubGF5b3V0XG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGEub3B0aW9ucz8uZGF0YTsgaW5kZXggYXMgaVwiPlxuICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvblxuICAgICAgICAgIFt2YWx1ZV09XCJpXCJcbiAgICAgICAgICBbY2hlY2tlZF09XCJzZWxlY3RlZEluZGV4ID09PSBpXCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKGkpXCJcbiAgICAgICAgICA+e3sgaXRlbS5sYWJlbCB9fTwvbWF0LXJhZGlvLWJ1dHRvblxuICAgICAgICA+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9tYXQtcmFkaW8tZ3JvdXA+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==