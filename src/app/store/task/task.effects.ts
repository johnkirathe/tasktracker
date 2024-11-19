import {inject, Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from 'rxjs';
import {sharedActions} from "../shared/shared.actions";
import {Store} from "@ngrx/store";
import {TasksService} from "../../services/tasks.service";
import {Task} from "../../models/task";
import {taskActions} from "./task.action";
import {Actions, createEffect, ofType} from "@ngrx/effects";

@Injectable()
export class TaskEffects {
  private readonly actions = inject(Actions);
  private readonly tasksService = inject(TasksService);
  private readonly store = inject(Store);

  loadTasksEffects = createEffect(() => {
    return this.actions.pipe(
      ofType(taskActions.tasksStart),
      switchMap(() => {
        this.store.dispatch(sharedActions.isLoading({status: true}));
        return this.tasksService.getAllTasks().pipe(
          map((tasks: Task[]) => {
            this.store.dispatch(sharedActions.isLoading({status: false}));
            return taskActions.tasksSuccess({tasks})
          }),
          catchError((error: any) => {
            this.store.dispatch(sharedActions.isLoading({status: false}));
            return of(taskActions.tasksFailure({errors: error.message}));
          })
        )
      })
    )
  },/*{functional: true}*/);
}
