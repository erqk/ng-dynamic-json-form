import {
  Component,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationPaneComponent } from 'src/app/shared/side-navigation-pane/side-navigation-pane.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TabBarComponent } from 'src/app/shared/tab-bar/tab-bar.component';
import { filter, tap } from 'rxjs/operators';
import { DocumentVersionSelectorComponent } from 'src/app/features/document/components/document-version-selector/document-version-selector.component';
import { LanguageSelectorComponent } from 'src/app/features/language/components/language-selector/language-selector.component';
import { ThemeSwitcherComponent } from 'src/app/features/theme/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SideNavigationPaneComponent,
    TabBarComponent,
    ThemeSwitcherComponent,
    LanguageSelectorComponent,
    DocumentVersionSelectorComponent,
  ],
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent {
  private _router = inject(Router);
  private _elementRef = inject(ElementRef);

  @Input() links: { label: string; route: string }[] = [];

  openSettings = false;
  openNavigationPane = false;
  showNavigationPaneButton = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    const host = this._elementRef.nativeElement as HTMLElement;
    if (host.contains(e.target as HTMLElement)) {
      return;
    }

    if (!this.openSettings && !this.openNavigationPane) {
      return;
    }

    this.openNavigationPane = false;
    this._toggleBackdrop(false);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (window.innerWidth > 992) return;

    const host = this._elementRef.nativeElement as HTMLElement;
    const shadowIntensity =
      window.scrollY / 200 > 0.35 ? 0.35 : window.scrollY / 200;
    host.style.boxShadow = `0 0 1.5rem rgba(0,0,0,${shadowIntensity})`;
  }

  ngOnInit(): void {
    this._createBackdrop();
    this._router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap((x) => {
          this.openNavigationPane = false;
          this._toggleBackdrop(false);
          this._setButtonNavigationPane();
        })
      )
      .subscribe();
  }

  toggleSettings(): void {
    this.openSettings = !this.openSettings;
    this._toggleBackdrop(false);
  }

  toggleNavigationPane(): void {
    this.openNavigationPane = !this.openNavigationPane;
    this._toggleBackdrop(this.openNavigationPane);
  }

  private _createBackdrop(): void {
    const anchorEl = document.querySelector('router-outlet');
    const backdropEl = document.createElement('div');

    backdropEl.classList.add('backdrop');
    anchorEl?.insertAdjacentElement('afterend', backdropEl);
  }

  private _toggleBackdrop(show?: boolean): void {
    const backdropEl = document.querySelector('.backdrop');

    if (show === undefined) {
      backdropEl?.classList.toggle('active');
    } else {
      show && backdropEl?.classList.add('active');
      !show && backdropEl?.classList.remove('active');
    }
  }

  private _setButtonNavigationPane(): void {
    switch (this._router.url) {
      case '/':
      case '/playground':
        this.showNavigationPaneButton = false;
        break;

      default:
        this.showNavigationPaneButton = true;
        break;
    }
  }
}
