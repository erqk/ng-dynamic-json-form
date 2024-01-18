import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormTitleComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'app-custom-form-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-form-title.component.html',
  styleUrls: ['./custom-form-title.component.scss'],
})
export class CustomFormTitleComponent extends FormTitleComponent {}
