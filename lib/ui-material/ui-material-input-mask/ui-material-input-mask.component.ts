import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { IMaskDirective } from 'angular-imask';
import {
  CustomControlComponent,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    IMaskDirective,
    PropsBindingDirective,
  ],
  templateUrl: './ui-material-input-mask.component.html',
  styles: [],
})
export class UiMaterialInputMaskComponent extends CustomControlComponent {
  override control = new FormControl('');
}
