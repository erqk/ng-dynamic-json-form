import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentVersionSelectorComponent } from 'src/app/features/document/components/document-version-selector/document-version-selector.component';
import { LanguageSelectorComponent } from 'src/app/features/language/components/language-selector/language-selector.component';
import { ThemeSwitcherComponent } from 'src/app/features/theme/components/theme-switcher/theme-switcher.component';
import { ContentWrapperComponent } from 'src/app/shared/content-wrapper/content-wrapper.component';
import { TabBarComponent } from 'src/app/shared/tab-bar/tab-bar.component';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContentWrapperComponent,
    TabBarComponent,
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
