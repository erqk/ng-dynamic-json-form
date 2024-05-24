import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-switch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'mat-slide-toggle',
          token: MatSlideToggle,
        },
      ],
    },
  ],
  templateUrl: './ui-material-switch.component.html',
  styles: [],
})
export class UiMaterialSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
}
