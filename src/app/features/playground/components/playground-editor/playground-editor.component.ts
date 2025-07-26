import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Subject,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { ThemeService } from 'src/app/features/theme/services/theme.service';
import { Content, JSONEditor, Mode } from 'vanilla-jsoneditor';
import { getJsonEditorContent } from '../../utilities/get-json-editor-content';

@Component({
    selector: 'app-playground-editor',
    imports: [CommonModule],
    templateUrl: './playground-editor.component.html',
    styleUrls: ['./playground-editor.component.scss']
})
export class PlaygroundEditorComponent {
  private destroyRef = inject(DestroyRef);
  private el = inject(ElementRef);
  private themeService = inject(ThemeService);
  private cancelWriteValue$ = new Subject<void>();

  @Input() data: Content | null = null;
  @Input() mainMenuBar = true;
  @Input() navigationBar = true;
  @Input() statusBar = true;
  @Output() onEditing = new EventEmitter<any>();

  jsonEditor: JSONEditor | null = null;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { data } = simpleChanges;

    if (data && this.jsonEditor) {
      this.cancelWriteValue$.next();
      try {
        timer(100)
          .pipe(
            take(1),
            tap(() => this.jsonEditor?.set(data.currentValue)),
            takeUntil(this.cancelWriteValue$)
          )
          .subscribe();
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
          this.initEditor();
          this.darkThemeEvent();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.jsonEditor?.destroy();
  }

  private initEditor(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const host = this.el.nativeElement as HTMLElement;
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

  private darkThemeEvent(): void {
    if (typeof window === 'undefined') return;

    let refreshTimeout = 0;

    const refreshEditor = () => {
      if (!this.jsonEditor) return;
      if (typeof this.jsonEditor.refresh !== 'function') return;
      this.jsonEditor.refresh();
    };

    const setDarkTheme = (dark = false) => {
      const host = this.el.nativeElement as HTMLElement;
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

    const themeDark$ = this.themeService.theme$.pipe(
      distinctUntilChanged(),
      tap((x) => setDarkTheme(x === 'dark'))
    );

    merge(prefersDark$, themeDark$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
