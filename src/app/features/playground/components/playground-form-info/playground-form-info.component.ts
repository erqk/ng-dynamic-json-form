import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() activeTab = 0;

  @Output() activeTabChange = new EventEmitter<number>();

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

  controlStates: { label: string; value: () => boolean }[] = [
    {
      label: 'dirty',
      value: () => this.control?.dirty ?? false,
    },
    {
      label: 'pristine',
      value: () => this.control?.pristine ?? false,
    },
    {
      label: 'touched',
      value: () => this.control?.touched ?? false,
    },
  ];

  switchTab(i: number): void {
    this.activeTab = i;
    this.activeTabChange.emit(i);
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
