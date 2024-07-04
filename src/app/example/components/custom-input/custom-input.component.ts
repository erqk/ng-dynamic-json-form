import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent extends CustomControlComponent {
  override control = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl(5, [Validators.required, Validators.min(1)]),
  });
}
