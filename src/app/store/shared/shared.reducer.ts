import {createFeature, createReducer, on} from '@ngrx/store';
import {sharedActions} from "./shared.actions";
import {initialState} from "./shared.state";

const authFeature = createFeature({
  name: 'shared',
  reducer: createReducer(
    initialState,
    on(sharedActions.isLoading, (state, action) => ({...state, isLoading: action.status})),
  )
});

export const {
  name: sharedFeatureKey,
  reducer: sharedReducer,
  selectIsLoading
} = authFeature;

