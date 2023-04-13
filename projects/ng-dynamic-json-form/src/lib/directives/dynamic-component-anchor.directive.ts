import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicComponentAnchor]',
  standalone: true,
})
export class DynamicComponentAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
