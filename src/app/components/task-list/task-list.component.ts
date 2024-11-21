import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {CommonModule} from "@angular/common";
import {Task} from "../../models/task";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {DataRowOutlet} from "@angular/cdk/table";
import {RouterLink} from "@angular/router";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDialog,} from "@angular/material/dialog";
import {TaskDialog} from "../shared/dialog/dialog.component";
import {Store} from "@ngrx/store";
import {taskActions} from "../../store/task/task.action";
import {TranslationService} from "../../services/translate.service";
import {selectTasks} from "../../store/task/task.reducer";
import {NgxtranslatehubDirective, NgxtranslatehubService} from "ngx-translatehub";


@Component({
  selector: 'app-task-list',
  standalone: true,
  providers: [NgxtranslatehubService],
  imports: [
    CommonModule,
    MatCardTitle,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatChipSet,
    MatChip,
    MatIconModule,
    DataRowOutlet,
    RouterLink,
    MatCheckbox,
    NgxtranslatehubDirective,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  tasks = signal<Task[]>([])
  // tasks = toSignal<Task>(this.taskService.getAllTasks());
  readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  $tasks = this.store.select(selectTasks);
  translationService = inject(TranslationService);
  taskService = inject(TasksService);
  language = signal<string>('');
  translatedData: any = {};
  private readonly url = 'assets/i18n/task-list.json';

  ngOnInit() {
    this.language.set(this.translationService.getDefaultLanguage());
    this.language.set(this.translationService.getDefaultLanguage());
    this.getAllTasks();
    this.loadTranslatedData();
  }

  loadTranslatedData(): void {
    this.translationService.loadData(this.url, this.language(), this.tasks()).subscribe(
      (translatedData) => {
        const backendArray = Array.isArray(translatedData.backendData)
          ? translatedData.backendData // If already an array, keep it as is
          : Object.values(translatedData.backendData);

        this.translatedData = {
          backendData: backendArray,
          frontendData: translatedData.frontendData
        };
        this.tasks.set(this.translatedData.backendData);
        this.translatedData = this.translatedData.frontendData;
      },
      (error) => {
        console.error('Error while translating:', error);
      }
    );
  }


  getAllTasks() {
    this.$tasks.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: any) => {
        this.tasks.set(response);
      });
    this.store.dispatch(taskActions.tasksStart());
  }

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialog, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks();
      }
    });
  }

  completeTask(task: Task) {
    const taskObj = {
      id: task.id,
      completed: true,
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    }
    this.taskService.completeTask(taskObj).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.getAllTasks();
      console.log(res);
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.getAllTasks();
      console.log(res);
    });
  }
}
