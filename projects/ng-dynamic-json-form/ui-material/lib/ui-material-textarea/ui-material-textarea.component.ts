import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ui-material-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './ui-material-textarea.component.html',
  styles: [],
})
export class UiMaterialTextareaComponent extends NgDynamicJsonFormCustomComponent {}
