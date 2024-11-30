import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // withComponentInputBinding let me catch the params as inputs
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    // to avoid problems with the url on production
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ]
};
