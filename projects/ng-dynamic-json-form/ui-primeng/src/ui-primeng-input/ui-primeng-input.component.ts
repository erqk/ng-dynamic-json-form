import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-primeng-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './ui-primeng-input.component.html',
  styles: [],
})
export class UiPrimengInputComponent extends NgDynamicJsonFormCustomComponent {}
