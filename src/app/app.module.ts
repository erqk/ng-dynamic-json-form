import { APP_INITIALIZER, NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { MarkdownModule } from 'ngx-markdown';
import { switchMap } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { absolutePathInterceptor } from './core/interceptors/absolute-path.interceptor';
import { DocumentVersionService } from './features/document/services/document-version.service';
import { HeaderComponent } from './features/header/components/header/header.component';
import { LanguageDataService } from './features/language/services/language-data.service';
import { UiLoadingIndicatorComponent } from './features/ui-loading-indicator/ui-loading-indicator.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TransferHttpCacheModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
    HeaderComponent,
    UiLoadingIndicatorComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [LanguageDataService, DocumentVersionService],
      multi: true,
      useFactory:
        (
          languageDataService: LanguageDataService,
          docVersionService: DocumentVersionService
        ) =>
        () => {
          return languageDataService
            .loadLanguageData$()
            .pipe(switchMap(() => docVersionService.loadVersions$()));
        },
    },
    provideHttpClient(withInterceptors([absolutePathInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
