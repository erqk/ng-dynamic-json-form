import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from '../components/custom-component-base/custom-component-base.component';
import { NgDynamicJsonFormControlConfig } from '../models/form-control-config.model';

@Directive({
  selector: '[formControlLoader]',
})
export class FormControlLoaderDirective {
  @Input() component?: Type<NgDynamicJsonFormCustomComponent>;
  @Input() config?: NgDynamicJsonFormControlConfig;
  @Input() control?: FormControl;

  constructor(private vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    if (!this.component || !this.config || !this.control) return;

    const componentRef = this.vcr.createComponent(this.component);
    componentRef.instance.control = this.control;
    componentRef.instance.data = this.config;
  }
}
