import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentVersionSelectorComponent } from 'src/app/features/document/components/document-version-selector/document-version-selector.component';
import { LanguageSelectorComponent } from 'src/app/features/language/components/language-selector/language-selector.component';
import { ThemeSwitcherComponent } from 'src/app/features/theme/components/theme-switcher/theme-switcher.component';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';
import { UiTabBarComponent } from 'src/app/features/ui-tab-bar/ui-tab-bar.component';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiContentWrapperComponent,
    UiTabBarComponent,
    ThemeSwitcherComponent,
    LanguageSelectorComponent,
    DocumentVersionSelectorComponent,
  ],
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
})
export class HeaderDesktopComponent {
  @Input() links: { route: string; label: string }[] = [];
}
