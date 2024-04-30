import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Subject, fromEvent, map, merge, takeUntil, tap } from 'rxjs';
import { ThemeService } from 'src/app/features/theme/services/theme.service';
import { Content, JSONEditor, Mode } from 'vanilla-jsoneditor';
import { getJsonEditorContent } from '../../utilities/get-json-editor-content';

@Component({
  selector: 'app-playground-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground-editor.component.html',
  styleUrls: ['./playground-editor.component.scss'],
})
export class PlaygroundEditorComponent {
  private _el = inject(ElementRef);
  private _themeService = inject(ThemeService);
  private _onDestroy$ = new Subject<void>();

  @Input() data: Content | null = null;
  @Input() mainMenuBar = true;
  @Input() navigationBar = true;
  @Input() statusBar = true;
  @Output() onEditing = new EventEmitter<any>();

  jsonEditor: JSONEditor | null = null;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { data } = simpleChanges;

    if (data && this.data && this.jsonEditor) {
      try {
        this.jsonEditor.set(this.data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  ngAfterViewInit(): void {
    this._initEditor();
    this._darkThemeEvent();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this.jsonEditor?.destroy();
  }

  private _initEditor(): void {
    if (typeof window === 'undefined') return;

    requestAnimationFrame(() => {
      const host = this._el.nativeElement as HTMLElement;
      const el = host.querySelector('.json-editor') as HTMLElement;

      this.jsonEditor = new JSONEditor({
        target: el,
        props: {
          mode: Mode.text,
          content: this.data || undefined,
          mainMenuBar: this.mainMenuBar,
          navigationBar: this.navigationBar,
          statusBar: this.statusBar,
          onChange: (content, previousContent, status) => {
            const _content = getJsonEditorContent(content) as any;
            this.onEditing.emit(_content['json']);
          },
        },
      });
    });
  }

  private _darkThemeEvent(): void {
    if (typeof window === 'undefined') return;

    const setDarkTheme = (dark = false) => {
      const host = this._el.nativeElement as HTMLElement;
      const el = host.querySelector('.json-editor') as HTMLElement;

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
