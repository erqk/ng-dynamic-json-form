import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'ui-primeng-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SliderModule],
  templateUrl: './ui-primeng-range.component.html',
  styles: [],
})
export class UiPrimengRangeComponent extends NgDynamicJsonFormCustomComponent {}
