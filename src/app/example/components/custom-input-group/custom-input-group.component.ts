import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from 'ng-dynamic-json-form';
import { SourceCodeViewerComponent } from 'src/app/shared/source-code-viewer/source-code-viewer.component';

@Component({
  selector: 'app-custom-input-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SourceCodeViewerComponent],
  templateUrl: './custom-input-group.component.html',
  styleUrls: ['./custom-input-group.component.scss'],
})
export class CustomInputGroupComponent extends CustomControlComponent {
  source = {
    html: 'https://raw.githubusercontent.com/erqk/ng-dynamic-json-form/main/src/app/example/components/custom-input-group/custom-input-group.component.html',
    ts: 'https://raw.githubusercontent.com/erqk/ng-dynamic-json-form/main/src/app/example/components/custom-input-group/custom-input-group.component.ts',
  };

  override control = new FormGroup({
    a: new FormControl(''),
    b: new FormControl(''),
    c: new FormControl(''),
  });
}
