import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
  TextareaAutHeightDirective,
} from '../../../public-api';

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
  @HostBinding('class') hostClass = 'ui-basic';
  override control = new FormControl('');
}
