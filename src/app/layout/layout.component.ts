import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FADE_UP_ANIMATION } from '../animations/fade-up.animation';
import { DocsLoaderService } from '../features/doc/services/docs-loader.service';
import { NavigatorTitleComponent } from '../features/navigator/components/navigator-title/navigator-title.component';
import { UiContentWrapperComponent } from '../features/ui-content-wrapper/ui-content-wrapper.component';
import { UiLoadingIndicatorComponent } from '../features/ui-loading-indicator/ui-loading-indicator.component';

@Component({
    selector: 'app-layout',
    imports: [
        CommonModule,
        RouterModule,
        UiContentWrapperComponent,
        NavigatorTitleComponent,
        UiLoadingIndicatorComponent,
    ],
    template: `
    @if (docsLoading$.value === true) {
      <ui-loading-indicator
      ></ui-loading-indicator>
    }
    
    <ui-content-wrapper
      class="main"
      [ngClass]="{
        hidden: docsLoading$.value === true
      }"
      [maxWidth]="'100%'"
      [@fade-up]="docsLoading$.value === false"
      >
      <app-navigator-title class="side-pane"></app-navigator-title>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </ui-content-wrapper>
    `,
    styleUrls: ['./layout.component.scss'],
    animations: [FADE_UP_ANIMATION]
})
export class LayoutComponent {
  private docsLoaderService = inject(DocsLoaderService);

  docsLoading$ = this.docsLoaderService.docLoading$;
}
