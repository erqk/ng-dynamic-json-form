import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Content } from 'vanilla-jsoneditor';
import { PlaygroundEditorComponent } from '../playground-editor/playground-editor.component';

@Component({
  selector: 'app-playground-form-info',
  standalone: true,
  imports: [CommonModule, PlaygroundEditorComponent],
  templateUrl: './playground-form-info.component.html',
  styleUrls: ['./playground-form-info.component.scss'],
})
export class PlaygroundFormInfoComponent {
  private _editorValue?: Content;

  @Input() control?: AbstractControl;

  tabs = [
    {
      key: 0,
      label: 'Value',
      icon: 'bi bi-info-circle',
    },
    {
      key: 1,
      label: 'Errors',
      icon: 'bi bi-exclamation-triangle',
    },
    {
      key: 2,
      label: 'Edit',
      icon: 'bi bi-pencil-square',
    },
  ];

  editToolbar = [
    {
      label: 'patchValue()',
      action: () => this.patchControl(),
    },
    {
      label: 'disable()',
      action: () => this.control?.disable(),
    },
    {
      label: 'enable()',
      action: () => this.control?.enable(),
    },
  ];

  selectedTab = 0;

  switchTab(i: number): void {
    this.selectedTab = i;
  }

  onEditing(e: any): void {
    this._editorValue = e;
  }

  patchControl(): void {
    const value = this._editorValue;
    if (!value) return;

    this.control?.patchValue(value);
  }
}
