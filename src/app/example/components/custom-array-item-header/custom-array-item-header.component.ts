import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArrayItemHeaderComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'app-custom-array-item-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-array-item-header.component.html',
  styleUrls: ['./custom-array-item-header.component.scss'],
})
export class CustomArrayItemHeaderComponent extends FormArrayItemHeaderComponent {}
