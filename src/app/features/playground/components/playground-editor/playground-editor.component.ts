import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  tap,
  timer,
} from 'rxjs';
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
  private _destroyRef = inject(DestroyRef);
  private _el = inject(ElementRef);
  private _themeService = inject(ThemeService);

  @Input() data: Content | null = null;
  @Input() mainMenuBar = true;
  @Input() navigationBar = true;
  @Input() statusBar = true;
  @Output() onEditing = new EventEmitter<any>();

  jsonEditor: JSONEditor | null = null;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { data } = simpleChanges;

    if (data && this.jsonEditor) {
      try {
        this.jsonEditor.set(data.currentValue);
      } catch (err) {
        console.error(err);
      }
    }
  }

  ngAfterViewInit(): void {
    // Put in the next event loop to improve performance if there are multiple editor
    // in the same page.
    timer(200)
      .pipe(
        tap(() => {
          this._initEditor();
          this._darkThemeEvent();
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.jsonEditor?.destroy();
  }

  private _initEditor(): void {
    if (typeof window === 'undefined') {
      return;
    }

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
  }

  private _darkThemeEvent(): void {
    if (typeof window === 'undefined') return;

    let refreshTimeout = 0;

    const refreshEditor = () => {
      if (!this.jsonEditor) return;
      if (typeof this.jsonEditor.refresh !== 'function') return;
      this.jsonEditor.refresh();
    };

    const setDarkTheme = (dark = false) => {
      const host = this._el.nativeElement as HTMLElement;
      const el = host.querySelector('.json-editor') as HTMLElement;

      if (dark) el.classList.add('jse-theme-dark');
      else el.classList.remove('jse-theme-dark');

      window.clearTimeout(refreshTimeout);
      refreshTimeout = window.setTimeout(() => refreshEditor());
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark$ = fromEvent(mediaQueryList, 'change', {
      passive: true,
    }).pipe(
      map((x) => (x as MediaQueryListEvent).matches),
      tap((x) => setDarkTheme(x))
    );

    const themeDark$ = this._themeService.theme$.pipe(
      distinctUntilChanged(),
      tap((x) => setDarkTheme(x === 'dark'))
    );

    merge(prefersDark$, themeDark$)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
