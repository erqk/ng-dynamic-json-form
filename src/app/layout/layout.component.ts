import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiContentWrapperComponent } from '../features/ui-content-wrapper/ui-content-wrapper.component';
import { SideNavigationPaneComponent } from '../features/side-navigation-pane/side-navigation-pane.component';
import { DocumentLoaderService } from '../features/document/services/document-loader.service';
import { LoadingIndicatorComponent } from '../features/ui-loading-indicator/ui-loading-indicator.component';
import { FADE_UP_ANIMATION } from '../animations/fade-up.animation';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiContentWrapperComponent,
    SideNavigationPaneComponent,
    LoadingIndicatorComponent,
  ],
  template: `
    <ui-loading-indicator
      *ngIf="documentLoading$.value === true"
    ></ui-loading-indicator>

    <ui-content-wrapper
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
    </ui-content-wrapper>
  `,
  styleUrls: ['./layout.component.scss'],
  animations: [FADE_UP_ANIMATION]
})
export class LayoutComponent {
  private _documentLoaderService = inject(DocumentLoaderService);

  documentLoading$ = this._documentLoaderService.documentLoading$;
}
