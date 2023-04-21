import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-primeng-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './ui-primeng-dropdown.component.html',
  styles: [],
})
export class UiPrimengDropdownComponent extends NgDynamicJsonFormCustomComponent {}
