import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentWrapperComponent } from '../shared/content-wrapper/content-wrapper.component';
import { SideNavigationPaneComponent } from '../shared/side-navigation-pane/side-navigation-pane.component';
import { DocumentLoaderService } from '../features/document/services/document-loader.service';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { FADE_UP_ANIMATION } from '../animations/fade-up.animation';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContentWrapperComponent,
    SideNavigationPaneComponent,
    LoadingIndicatorComponent,
  ],
  template: `
    <app-loading-indicator
      *ngIf="documentLoading$.value === true"
    ></app-loading-indicator>

    <app-content-wrapper
      class="main"
      [ngClass]="{
        hidden: documentLoading$.value === true
      }"
      [maxWidth]="'100%'"
      [@fade-up]="documentLoading$.value === false"
    >
      <app-side-navigation-pane class="side-pane"></app-side-navigation-pane>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </app-content-wrapper>
  `,
  styleUrls: ['./layout.component.scss'],
  animations: [FADE_UP_ANIMATION]
})
export class LayoutComponent {
  private documentLoaderService = inject(DocumentLoaderService);

  documentLoading$ = this.documentLoaderService.documentLoading$;
}
