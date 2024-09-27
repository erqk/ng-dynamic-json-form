import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import {
  PropsBindingDirective,
  TextareaAutHeightDirective,
} from '../../directives';
import { providePropsBinding } from '../../providers/props-binding.provider';

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
    providePropsBinding([
      {
        key: 'textarea-autoheight',
        token: TextareaAutHeightDirective,
      },
    ]),
  ],
  templateUrl: './ui-basic-textarea.component.html',
  styles: [],
})
export class UiBasicTextareaComponent extends CustomControlComponent {
  @HostBinding('class') hostClass = 'ui-basic';
  override control = new FormControl('');

  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
