import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaAutoResizeDirective } from '../../../directives';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';

@Component({
  selector: 'ui-basic-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextareaAutoResizeDirective],
  templateUrl: './ui-basic-textarea.component.html',
  styles: [],
})
export class UiBasicTextareaComponent extends NgDynamicJsonFormCustomComponent {}
