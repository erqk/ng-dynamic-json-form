import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { absolutePathInterceptor } from './core/interceptors/absolute-path.interceptor';
import { LanguageDataService } from './features/language/language-data.service';
import { VersionService } from './features/version/version.service';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
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
})
export class AppModule {}
