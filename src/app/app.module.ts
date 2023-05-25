import { APP_INITIALIZER, NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/components/header.component';
import { LanguageDataService } from './features/language/services/language-data.service';
import { LoadingIndicatorComponent } from './shared/loading-indicator/loading-indicator.component';

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
    LoadingIndicatorComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [LanguageDataService],
      multi: true,
      useFactory: (languageDataService: LanguageDataService) => () =>
        languageDataService.setLanguage$(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
