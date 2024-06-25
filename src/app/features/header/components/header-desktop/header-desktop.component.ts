import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSelectorComponent } from 'src/app/features/language/language-selector.component';
import { ThemeSwitcherComponent } from 'src/app/features/theme/components/theme-switcher/theme-switcher.component';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';
import { HeaderTabBarComponent } from 'src/app/features/header/components/header-tab-bar/header-tab-bar.component';
import { VersionService } from 'src/app/features/version/version.service';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiContentWrapperComponent,
    HeaderTabBarComponent,
    ThemeSwitcherComponent,
    LanguageSelectorComponent,
  ],
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
})
export class HeaderDesktopComponent {
  private _versionService = inject(VersionService);

  currentVersion = this._versionService.currentVersion;

  @Input() links: { route: string; label: string }[] = [];
}
