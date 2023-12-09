import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'ui-primeng-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextareaModule],
  templateUrl: './ui-primeng-textarea.component.html',
  styles: [],
})
export class UiPrimengTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');
}
