import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Subject,
  tap,
  timer,
} from 'rxjs';
import { ThemeService } from 'src/app/features/theme/services/theme.service';
import {
  Content,
  createJSONEditor,
  JsonEditor,
  Mode,
} from 'vanilla-jsoneditor';
import { getJsonEditorContent } from '../../utilities/get-json-editor-content';

@Component({
  selector: 'app-playground-editor',
  imports: [CommonModule],
  templateUrl: './playground-editor.component.html',
  styleUrls: ['./playground-editor.component.scss'],
})
export class PlaygroundEditorComponent {
  private destroyRef = inject(DestroyRef);
  private el = inject(ElementRef);
  private themeService = inject(ThemeService);
  private cancelWriteValue$ = new Subject<void>();

  data = input<Content | null>(null);
  mainMenuBar = input<boolean>(true);
  navigationBar = input<boolean>(true);
  statusBar = input<boolean>(true);
  onEditing = output<any>();

  jsonEditor = signal<JsonEditor | null>(null);

  initEvent = afterNextRender(() => {
    // Put in the next event loop to improve performance if there are multiple editor
    // in the same page.
    timer(200)
      .pipe(
        tap(() => {
          this.createEditor();
          this.darkThemeEvent();
        }),
      )
      .subscribe();
  });

  writeValueIntoEditor = effect(() => {
    const data = this.data();
    const editor = this.jsonEditor();

    if (!data || !editor) {
      return;
    }

    editor.set(data);
  });

  themeSwitchEvent = effect(() => {
    const editor = this.jsonEditor();
    if (!editor) {
      return;
    }
  });

  ngOnDestroy(): void {
    this.jsonEditor()?.destroy();
  }

  private createEditor(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const host = this.el.nativeElement as HTMLElement;
    const el = host.querySelector('.json-editor') as HTMLElement;

    this.jsonEditor.set(
      createJSONEditor({
        target: el,
        props: {
          mode: Mode.text,
          content: this.data() || undefined,
          mainMenuBar: this.mainMenuBar(),
          navigationBar: this.navigationBar(),
          statusBar: this.statusBar(),
          onChange: (
            content: Content | undefined,
            previousContent: Content | undefined,
            status: any,
          ) => {
            const _content = getJsonEditorContent(content) as any;
            this.onEditing.emit(_content['json']);
          },
        },
      }),
    );
  }

  private darkThemeEvent(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const setDarkTheme = (dark = false) => {
      const host = this.el.nativeElement as HTMLElement;
      const el = host.querySelector('.json-editor') as HTMLElement;
      const editor = this.jsonEditor();

      if (dark) el.classList.add('jse-theme-dark');
      else el.classList.remove('jse-theme-dark');

      editor?.refresh();
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark$ = fromEvent(mediaQueryList, 'change', {
      passive: true,
    }).pipe(
      map((x) => (x as MediaQueryListEvent).matches),
      tap((x) => setDarkTheme(x)),
    );

    const themeDark$ = this.themeService.theme$.pipe(
      distinctUntilChanged(),
      tap((x) => setDarkTheme(x === 'dark')),
    );

    merge(prefersDark$, themeDark$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
