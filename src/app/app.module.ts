import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { absolutePathInterceptor } from './core/interceptors/absolute-path.interceptor';
import { HeaderComponent } from './features/header/components/header/header.component';
import { LanguageDataService } from './features/language/language-data.service';
import { UiLoadingIndicatorComponent } from './features/ui-loading-indicator/ui-loading-indicator.component';
import { VersionService } from './features/version/version.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderComponent,
    UiLoadingIndicatorComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [LanguageDataService, VersionService],
      multi: true,
      useFactory:
        (lang: LanguageDataService, version: VersionService) => () => {
          return lang
            .loadLanguageData$()
            .pipe(switchMap(() => version.loadVersions$()));
        },
    },
    provideHttpClient(withInterceptors([absolutePathInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
