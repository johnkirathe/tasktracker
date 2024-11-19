import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {HttpClient, provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {sharedFeatureKey, sharedReducer} from "./store/shared/shared.reducer";
import {TaskEffects} from "./store/task/task.effects";
import {taskFeatureKey, taskReducer} from "./store/task/task.reducer";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withRouterConfig({defaultQueryParamsHandling: 'merge'})),
    provideClientHydration(withEventReplay()), provideNativeDateAdapter(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideStore(),
    provideState(sharedFeatureKey, sharedReducer),
    provideState(taskFeatureKey, taskReducer),
    provideEffects([TaskEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    provideHttpClient(withFetch()), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
