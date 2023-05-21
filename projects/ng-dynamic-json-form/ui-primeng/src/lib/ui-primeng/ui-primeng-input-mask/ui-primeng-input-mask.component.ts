import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'ui-primeng-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    NgxMaskDirective,
  ],
  templateUrl: './ui-primeng-input-mask.component.html',
  styles: [],
  providers: [provideNgxMask()],
})
export class UiPrimengInputMaskComponent extends NgDynamicJsonFormCustomComponent {}
