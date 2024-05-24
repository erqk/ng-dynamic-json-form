import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from 'src/app/core/services/layout.service';
import { LanguageSelectorComponent } from 'src/app/features/language/language-selector.component';
import { NavigatorTitleComponent } from 'src/app/features/navigator/components/navigator-title/navigator-title.component';
import { ThemeSwitcherComponent } from 'src/app/features/theme/components/theme-switcher/theme-switcher.component';
import { HeaderTabBarComponent } from 'src/app/features/header/components/header-tab-bar/header-tab-bar.component';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigatorTitleComponent,
    HeaderTabBarComponent,
    ThemeSwitcherComponent,
    LanguageSelectorComponent,
  ],
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent {
  private _layoutService = inject(LayoutService);

  @Input() links: { label: string; route: string }[] = [];

  openSettings = false;

  toggleSettings(): void {
    this.openSettings = !this.openSettings;

    requestAnimationFrame(() => {
      this._layoutService.updateHeaderHeight();
    });
  }
}
