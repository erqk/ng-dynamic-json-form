import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { switchMap } from 'rxjs';
import { appRoutes } from './app.routes';
import { absolutePathInterceptor } from './core/interceptors/absolute-path.interceptor';
import { LanguageDataService } from './features/language/language-data.service';
import { VersionService } from './features/version/version.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([absolutePathInterceptor])),
    provideClientHydration(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules)
    ),
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
  ],
};
