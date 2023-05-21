import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentWrapperComponent } from '../shared/content-wrapper/content-wrapper.component';
import { SideNavigationPaneComponent } from '../shared/side-navigation-pane/side-navigation-pane.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContentWrapperComponent,
    SideNavigationPaneComponent,
  ],
  template: `
    <app-content-wrapper class="main" [maxWidth]="'85rem'">
      <app-side-navigation-pane class="side-pane"></app-side-navigation-pane>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </app-content-wrapper>
  `,
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
