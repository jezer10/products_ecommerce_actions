import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { registerLocaleData } from '@angular/common';
import localeEs from "@angular/common/locales/es"
registerLocaleData(localeEs)
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: any) =>
        settingsService.getLanguage('en-US'),
    },
  ],
};
