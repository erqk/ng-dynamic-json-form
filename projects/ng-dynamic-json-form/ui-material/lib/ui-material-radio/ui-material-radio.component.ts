import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CustomControlComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatInputModule],
  templateUrl: './ui-material-radio.component.html',
  styles: [],
})
export class UiMaterialRadioComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');
}
