import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, MatTableModule,
      MatPaginatorModule, MatButtonModule, ), 
    provideAnimationsAsync()
  ]
};
