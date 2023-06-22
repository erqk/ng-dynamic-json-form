import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  NgDynamicJsonFormCustomComponent
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './ui-material-input.component.html',
  styles: [],
})
export class UiMaterialInputComponent extends NgDynamicJsonFormCustomComponent {}
