import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';

@Component({
  selector: 'ui-basic-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-dropdown.component.html',
  styles: [],
})
export class UiBasicDropdownComponent extends NgDynamicJsonFormCustomComponent {}
