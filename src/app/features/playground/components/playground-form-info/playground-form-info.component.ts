import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-playground-form-info',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './playground-form-info.component.html',
  styleUrls: ['./playground-form-info.component.scss'],
})
export class PlaygroundFormInfoComponent {
  @Input() form?: UntypedFormGroup;

  tabs = [
    {
      key: 0,
      label: 'Value',
    },
    {
      key: 1,
      label: 'Errors',
    },
  ];

  selectedTab = 0;

  switchTab(i: number): void {
    this.selectedTab = i;
  }
}
