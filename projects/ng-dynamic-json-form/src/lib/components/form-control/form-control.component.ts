import { CommonModule } from '@angular/common';
import { Component, Input, Type, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { DynamicComponentAnchorDirective } from '../../directives/dynamic-component-anchor.directive';
import { NgDynamicJsonFormControlConfig } from '../../models/form-control-config.model';
import { NgDynamicJsonFormCustomComponent } from '../custom-component-base/custom-component-base.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicComponentAnchorDirective,
    ErrorMessageComponent,
  ],
})
export class FormControlComponent {
  @Input() data: NgDynamicJsonFormControlConfig | null = null;
  @Input() control: UntypedFormControl | null = null;
  @Input() customComponent?: Type<NgDynamicJsonFormCustomComponent>;

  @ViewChild(DynamicComponentAnchorDirective, { static: true })
  dynamicComponentAnchor?: DynamicComponentAnchorDirective;

  ngOnInit(): void {
    this.injectCustomComponent();
  }

  private injectCustomComponent(): void {
    if (!this.customComponent || !this.dynamicComponentAnchor) return;

    const componentRef =
      this.dynamicComponentAnchor.viewContainerRef.createComponent(
        this.customComponent
      );
    componentRef.instance.control = this.control;
    componentRef.instance.data = this.data;
  }

  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (!input.checked || this.control?.value.includes(input.value)) {
      this.control?.setValue(
        this.control.value.filter((x: any) => x !== input.value)
      );
    } else {
      this.control?.setValue([...this.control.value, input.value]);
    }
  }
}
