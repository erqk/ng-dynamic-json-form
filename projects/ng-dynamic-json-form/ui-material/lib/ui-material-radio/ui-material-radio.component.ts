import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'ui-material-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './ui-material-radio.component.html',
  styles: [],
})
export class UiMaterialRadioComponent extends NgDynamicJsonFormCustomComponent {}
