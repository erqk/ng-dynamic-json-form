import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';

@Component({
  selector: 'ui-basic-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-textarea.component.html',
  styles: [],
})
export class UiBasicTextareaComponent extends NgDynamicJsonFormCustomComponent {}
