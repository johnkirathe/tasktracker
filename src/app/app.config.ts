import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {sharedFeatureKey, sharedReducer} from "./store/shared/shared.reducer";
import {TaskEffects} from "./store/task/task.effects";
import {taskFeatureKey, taskReducer} from "./store/task/task.reducer";
import {provideStoreDevtools} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withRouterConfig({defaultQueryParamsHandling: 'merge'})),
    provideClientHydration(withEventReplay()), provideNativeDateAdapter(),
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
