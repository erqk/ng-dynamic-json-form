import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ui-material-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatInputModule],
  templateUrl: './ui-material-radio.component.html',
  styles: [],
})
export class UiMaterialRadioComponent extends NgDynamicJsonFormCustomComponent {}
