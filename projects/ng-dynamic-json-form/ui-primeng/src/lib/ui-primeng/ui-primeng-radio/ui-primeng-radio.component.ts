import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-primeng-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RadioButtonModule],
  templateUrl: './ui-primeng-radio.component.html',
  styles: [],
})
export class UiPrimengRadioComponent extends NgDynamicJsonFormCustomComponent {}
