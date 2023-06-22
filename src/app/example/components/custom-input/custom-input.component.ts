import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from 'ng-dynamic-json-form';
import { SourceCodeViewerComponent } from 'src/app/shared/source-code-viewer/source-code-viewer.component';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SourceCodeViewerComponent],
})
export class CustomInputComponent extends NgDynamicJsonFormCustomComponent {
  source = {
    html: 'https://raw.githubusercontent.com/erqk/ng-dynamic-json-form/main/src/app/example/components/custom-input/custom-input.component.html',
    ts: 'https://raw.githubusercontent.com/erqk/ng-dynamic-json-form/main/src/app/example/components/custom-input/custom-input.component.ts',
  };
}
