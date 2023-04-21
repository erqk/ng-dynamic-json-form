import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'ui-primeng-switch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputSwitchModule],
  templateUrl: './ui-primeng-switch.component.html',
  styles: [],
})
export class UiPrimengSwitchComponent extends NgDynamicJsonFormCustomComponent {}
