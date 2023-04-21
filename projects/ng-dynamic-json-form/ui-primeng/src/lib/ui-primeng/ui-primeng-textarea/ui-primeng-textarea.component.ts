import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'ui-primeng-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextareaModule],
  templateUrl: './ui-primeng-textarea.component.html',
  styles: [],
})
export class UiPrimengTextareaComponent extends NgDynamicJsonFormCustomComponent {}
