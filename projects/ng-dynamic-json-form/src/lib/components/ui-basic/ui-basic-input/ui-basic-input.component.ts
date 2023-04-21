import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-basic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-input.component.html',
  styles: [],
})
export class UiBasicInputComponent extends NgDynamicJsonFormCustomComponent {}
