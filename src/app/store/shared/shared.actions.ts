import {createActionGroup, props} from "@ngrx/store";

export const sharedActions = createActionGroup({
  source: 'shared',
  events: {
    'is Loading': props<{ status: boolean }>(),
  }
});
