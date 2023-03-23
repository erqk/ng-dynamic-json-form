import { Component, EventEmitter, Output } from '@angular/core';
import { JsonFormControlData } from 'src/app/core/models/json-form-control-data.model';

@Component({
  selector: 'app-json-input',
  template: `<div class="json-editor"></div>`,
  styles: [
    `
      .json-editor {
        height: 100%;
      }
    `,
  ],
  standalone: true,
})
export class JsonInputComponent {
  @Output() onChanged = new EventEmitter();

  editor?: any;

  ngOnInit(): void {
    this.initJsonEditor();
  }

  initJsonEditor(): void {
    const el = document.querySelector('.json-editor') as HTMLElement;
    const JSONEditor = require('jsoneditor');

    this.editor = new JSONEditor(el, {
      mode: 'code',
      onChangeText: (jsonString: string) => this.onChanged.emit(jsonString),
    });
  }

  generateForm(): void {
    this.editor.validate();
    const json = this.editor.get();
    console.log(json);
  }
}
