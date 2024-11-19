import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    // renderMode: RenderMode.SSR,
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/task-list/task-list.component').then((m) => m.TaskListComponent)
  },
  {path: 'add', loadComponent: () => import('./components/task-form/task-form.component').then(m => m.TaskFormComponent)},
  {path: 'tasks/:id', loadComponent: () => import('./components/task-details/task-details.component').then(m => m.TaskDetailsComponent)},
  {path: '**', redirectTo: 'page/error'}
];
