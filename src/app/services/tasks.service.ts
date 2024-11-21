import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly api = inject(ApiService);

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.api.get('tasks');
  }

  getTask(id: number): Observable<Task> {
    return this.api.get('tasks/'+ id);
  }

  addTask(task: Task): Observable<Task> {
    return this.api.post('tasks/', task);
  }

  editTask(id: number, task: Task): Observable<Task> {
    return this.api.put('tasks/'+ id, task);
  }

  completeTask(task: Task): Observable<Task> {
    return this.api.put('tasks/'+ task.id, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.api.delete('tasks/'+ id);
  }
}
