import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  ErrorMessageService,
  NgDynamicJsonFormCustomComponent,
} from 'ng-dynamic-json-form';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'ui-material-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  templateUrl: './ui-material-input-mask.component.html',
  styles: [],
  providers: [ErrorMessageService, provideNgxMask()],
})
export class UiMaterialInputMaskComponent extends NgDynamicJsonFormCustomComponent {}
