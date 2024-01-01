import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormControlConfig } from 'ng-dynamic-json-form/lib/models';
import {
  Subject,
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  merge,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ThemeService } from 'src/app/features/theme/services/theme.service';
import { JSONEditor, Mode } from 'vanilla-jsoneditor';
import { PlaygroundEditorDataService } from '../../services/playground-editor-data.service';
import { PlaygroundTemplateDataService } from '../../services/playground-template-data.service';

@Component({
  selector: 'app-playground-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground-editor.component.html',
  styleUrls: ['./playground-editor.component.scss'],
})
export class PlaygroundEditorComponent {
  private _el = inject(ElementRef);
  private _editorDataService = inject(PlaygroundEditorDataService);
  private _templateDataService = inject(PlaygroundTemplateDataService);
  private _themeService = inject(ThemeService);
  private _layoutService = inject(LayoutService);
  private readonly _onDestroy$ = new Subject<void>();

  @Input() maxHeight = '100vh';
  @Output() onConfirm = new EventEmitter<string | FormControlConfig[]>();

  jsonEditor: JSONEditor | null = null;
  headerHeight$ = this._layoutService.headerHeight$;

  ngAfterViewInit(): void {
    this._initEditor();
    this._darkThemeEvent();
    this._updateEditor();
    this._updateModifiedDataOnTemplateChange();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this.jsonEditor?.destroy();
  }

  private _initEditor(): void {
    requestAnimationFrame(() => {
      const host = this._el.nativeElement as HTMLElement;
      const el = host.querySelector('.json-editor') as HTMLElement;

      this.jsonEditor = new JSONEditor({
        target: el,
        props: {
          mode: Mode.text,
          content: this._editorDataService.editorData,
          onChange: (content, previousContent, status) => {
            this._editorDataService.saveModifiedData(content);
          },
        },
      });
    });
  }

  private _updateEditor(): void {
    this._editorDataService.editorData$
      .pipe(
        tap((x) => this.jsonEditor?.set(x)),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _updateModifiedDataOnTemplateChange(): void {
    this._templateDataService.currentTemplateKey$
      .pipe(
        tap(() => {
          const config = (
            this._editorDataService.getContent(this.jsonEditor?.get()) as any
          )['json'];

          if (!config) return;

          this._editorDataService.modifiedData = config;
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _darkThemeEvent(): void {
    const setDarkTheme = (dark = false) => {
      const el = document.querySelector('.json-editor') as HTMLElement;

      if (dark) el.classList.add('jse-theme-dark');
      else el.classList.remove('jse-theme-dark');
      this.jsonEditor?.refresh();
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark$ = fromEvent(mediaQueryList, 'change', {
      passive: true,
    }).pipe(
      map((x) => (x as MediaQueryListEvent).matches),
      tap((x) => setDarkTheme(x))
    );

    const themeDark$ = this._themeService.theme$.pipe(
      tap((x) => setDarkTheme(x === 'dark'))
    );

    merge(prefersDark$, themeDark$)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe();
  }
}
