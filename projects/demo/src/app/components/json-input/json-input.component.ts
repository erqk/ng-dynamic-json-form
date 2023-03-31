import { Component, EventEmitter, Output } from '@angular/core';
import { testData } from 'src/app/test-data';

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
    const content =
      window.sessionStorage.getItem('jsonEditorContent') ||
      JSON.stringify(testData);

    this.editor = new JSONEditor(el, {
      mode: 'code',
      onChangeText: (jsonString: string) => this.onChangeText(jsonString),
    });

    if (!!content) {
      try {
        this.editor.set(JSON.parse(content));
        this.onChangeText(content);
      } catch (e) {}
    }
  }

  private onChangeText(jsonString: string): void {
    this.onChanged.emit(jsonString);
    window.sessionStorage.setItem('jsonEditorContent', jsonString);
  }
}
