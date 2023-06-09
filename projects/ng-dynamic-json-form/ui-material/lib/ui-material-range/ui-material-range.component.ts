import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule, MatInputModule],
  templateUrl: './ui-material-range.component.html',
  styles: [],
})
export class UiMaterialRangeComponent extends NgDynamicJsonFormCustomComponent {}
