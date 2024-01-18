import { APP_INITIALIZER, NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/components/header/header.component';
import { LanguageDataService } from './features/language/services/language-data.service';
import { UiLoadingIndicatorComponent } from './features/ui-loading-indicator/ui-loading-indicator.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
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
      deps: [LanguageDataService],
      multi: true,
      useFactory: (languageDataService: LanguageDataService) => () =>
        languageDataService.loadLanguageData$(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
