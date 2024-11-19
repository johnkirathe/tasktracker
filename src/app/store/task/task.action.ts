import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Task} from "../../models/task";

export const taskActions = createActionGroup({
  source: 'task',
  events: {
    'Tasks Start': emptyProps(),
    'Tasks Success': props<{ tasks: Task[] }>(),
    'Tasks Failure': props<{ errors: unknown }>()
  }
});
