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
    const contentSaved = window.localStorage.getItem('jsonEditorContent');

    this.editor = new JSONEditor(el, {
      mode: 'code',
      onChangeText: (jsonString: string) => this.onChangeText(jsonString),
    });

    if (!!contentSaved) {
      try {
        this.editor.set(JSON.parse(contentSaved));
        this.onChangeText(contentSaved);
      } catch (e) {}
    }
  }

  private onChangeText(jsonString: string): void {
    this.onChanged.emit(jsonString);
    window.localStorage.setItem('jsonEditorContent', jsonString);
  }
}
