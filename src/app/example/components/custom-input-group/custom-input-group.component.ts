import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { debounceTime, tap, startWith } from 'rxjs';

@Component({
  selector: 'app-custom-input-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-input-group.component.html',
  styleUrls: ['./custom-input-group.component.scss'],
})
export class CustomInputGroupComponent extends NgDynamicJsonFormCustomComponent {
  override viewControl = new FormGroup({
    control1: new FormControl(''),
    control2: new FormControl(''),
    control3: new FormControl(''),
  });
}
