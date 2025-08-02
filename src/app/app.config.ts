import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { merge } from 'rxjs';
import { appRoutes } from './app.routes';
import { absolutePathInterceptor } from './core/interceptors/absolute-path.interceptor';
import { LanguageService } from './features/language/language-data.service';
import { VersionService } from './features/version/version.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const langService = inject(LanguageService);
      const versionService = inject(VersionService);

      return merge(
        langService.loadLanguageData$(),
        versionService.loadVersions$(),
      );
    }),
    provideAnimations(),
    provideHttpClient(withInterceptors([absolutePathInterceptor])),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules),
    ),
    providePrimeNG({
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '{indigo.50}',
              100: '{indigo.100}',
              200: '{indigo.200}',
              300: '{indigo.300}',
              400: '{indigo.400}',
              500: '{indigo.500}',
              600: '{indigo.600}',
              700: '{indigo.700}',
              800: '{indigo.800}',
              900: '{indigo.900}',
              950: '{indigo.950}',
            },
          },
        }),
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
  ],
};
