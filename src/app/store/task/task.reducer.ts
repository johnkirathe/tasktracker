import {createFeature, createReducer, on} from "@ngrx/store";
import {initialState} from "./state";
import {taskActions} from "./task.action";

const tasksFeature = createFeature({
  name: 'task',
  reducer: createReducer(
    initialState,
    on(taskActions.tasksStart, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null})),
    on(taskActions.tasksSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      tasks: action.tasks})),
    on(taskActions.tasksFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
  )
});

export const {
  name: taskFeatureKey,
  reducer: taskReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectTasks
} = tasksFeature;
