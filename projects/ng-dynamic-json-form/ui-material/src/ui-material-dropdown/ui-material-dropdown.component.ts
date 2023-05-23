import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'ui-material-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './ui-material-dropdown.component.html',
  styles: [],
})
export class UiMaterialDropdownComponent extends NgDynamicJsonFormCustomComponent {}
