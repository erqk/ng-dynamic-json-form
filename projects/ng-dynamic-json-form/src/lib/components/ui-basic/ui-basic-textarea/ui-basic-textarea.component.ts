import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
  TextareaAutHeightDirective,
} from '../../../directives';
import { CustomControlComponent } from '../../custom-control/custom-control.component';

@Component({
  selector: 'ui-basic-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextareaAutHeightDirective,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [TextareaAutHeightDirective],
    },
  ],
  templateUrl: './ui-basic-textarea.component.html',
  styles: [],
})
export class UiBasicTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');
}
