import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-layout-illustration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-layout-illustration.component.html',
  styleUrls: ['./input-layout-illustration.component.scss'],
})
export class InputLayoutIllustrationComponent {
  @Input() isFormGroup: 'true' | 'false' = 'false';
  @Input() descriptionPosition: 'after' | 'before' = 'before';
  @Input() showTags: 'true' | 'false' = 'true';
}
