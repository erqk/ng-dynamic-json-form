import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');

  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;

    this.control.setValue(value);
    this.onChange(value);
  }
}
