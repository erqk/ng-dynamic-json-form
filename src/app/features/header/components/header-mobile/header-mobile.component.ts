import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from 'src/app/core/services/layout.service';
import { HeaderTabBarComponent } from 'src/app/features/header/components/header-tab-bar/header-tab-bar.component';
import { LanguageSelectorComponent } from 'src/app/features/language/language-selector.component';
import { ThemeSwitcherComponent } from 'src/app/features/theme/components/theme-switcher/theme-switcher.component';
import { VersionSelectorComponent } from 'src/app/features/version/version-selector.component';

@Component({
  selector: 'app-header-mobile',
  imports: [
    CommonModule,
    RouterModule,
    HeaderTabBarComponent,
    ThemeSwitcherComponent,
    LanguageSelectorComponent,
    VersionSelectorComponent,
  ],
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent {
  private layoutService = inject(LayoutService);

  @Input() links: { label: string; route: string }[] = [];
  @Input() openSettings = false;
  @Output() settingsOpened = new EventEmitter<boolean>();

  toggleSettings(): void {
    this.openSettings = !this.openSettings;
    this.settingsOpened.emit(this.openSettings);

    requestAnimationFrame(() => {
      this.layoutService.updateHeaderHeight();
    });
  }
}
