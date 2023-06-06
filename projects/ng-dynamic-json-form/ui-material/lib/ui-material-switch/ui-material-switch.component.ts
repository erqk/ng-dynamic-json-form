import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ui-material-switch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
  ],
  templateUrl: './ui-material-switch.component.html',
  styles: [],
})
export class UiMaterialSwitchComponent extends NgDynamicJsonFormCustomComponent {}
