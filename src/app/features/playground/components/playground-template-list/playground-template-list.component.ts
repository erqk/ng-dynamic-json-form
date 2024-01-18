import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, map, switchMap } from 'rxjs';
import { DocumentVersionService } from 'src/app/features/document/services/document-version.service';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { PlaygroundEditorDataService } from '../../services/playground-editor-data.service';
import { PlaygroundTemplateDataService } from '../../services/playground-template-data.service';

@Component({
  selector: 'app-playground-template-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './playground-template-list.component.html',
  styleUrls: ['./playground-template-list.component.scss'],
})
export class PlaygroundTemplateListComponent {
  private _langService = inject(LanguageDataService);
  private _templateDataService = inject(PlaygroundTemplateDataService);
  private _docVersionService = inject(DocumentVersionService);
  private _editorDataService = inject(PlaygroundEditorDataService);

  @Output() onEdit = new EventEmitter<boolean>();

  nameControl = new FormControl('');
  isEditing = false;
  currentVersion = this._docVersionService.latestVersion;
  showTemplateNameInput = false;

  list$ = combineLatest([
    this._templateDataService.exampleList$,
    this._templateDataService.userTemplateList$,
  ]).pipe(
    debounceTime(0),
    map(([examples, userTemplates]) => [...examples, ...userTemplates])
  );

  currentTemplateKey$ = this._templateDataService.currentTemplateKey$;
  currentTemplate$ = combineLatest([this.list$, this.currentTemplateKey$]).pipe(
    debounceTime(0),
    map(([list, key]) => list.find((x) => x.key === key))
  );
  i18nContent$ = this._langService.i18nContent$;

  select(key: string): void {
    if (key === this.currentTemplateKey$.value) return;
    this.currentTemplateKey$.next(key);
    this.setEditStatus(false);
  }

  save(key: string, isUserTemplate: boolean): void {
    if (!key) return;

    const editorData = this._editorDataService.configModifiedData;

    isUserTemplate
      ? this._templateDataService.setUserTemplate(key, editorData)
      : this._templateDataService.setExampleTemplate(key, editorData);

    this.currentTemplateKey$.next(key);
    this.setEditStatus(false);
  }

  reset(key: string): void {
    if (!key) return;

    this._templateDataService.setExampleTemplate(
      key,
      this._templateDataService.fallbackExample
    );

    this._editorDataService.configModifiedData =
      this._templateDataService.fallbackExample;
    this._templateDataService.currentTemplateKey$.next(key);
  }

  remove(key: string): void {
    if (!key) return;

    this._templateDataService.setUserTemplate(key, null);
    this.setEditStatus(false);
    this._selectLastTemplate();
  }

  newTemplate(): void {
    const key = this.nameControl.value?.trim();
    const keyExists = this._templateDataService.allTemplateKeys.includes(
      key ?? ''
    );

    if (!key || keyExists) return;

    this._templateDataService.setUserTemplate(key, []);
    this.nameControl.setValue('');
    this.currentTemplateKey$.next(key);
    this.toggleTemplateNameInput(false);
    this.setEditStatus(true);
  }

  cancelNewTemplate(): void {
    this.nameControl.setValue('');
  }

  toggleTemplateNameInput(value: boolean): void {
    this.showTemplateNameInput = value;
  }

  setEditStatus(value: boolean): void {
    this.isEditing = value;
    this.onEdit.emit(this.isEditing);
  }

  private _selectLastTemplate(): void {
    const templateKeys = this._templateDataService.allTemplateKeys;

    window.setTimeout(() => {
      this.currentTemplateKey$.next(templateKeys[templateKeys.length - 1]);
    });
  }
}
