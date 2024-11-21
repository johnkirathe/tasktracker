import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {DatePipe, NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Task} from "../../models/task";
import {TasksService} from "../../services/tasks.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    NgClass,
    MatButton,
    RouterLink,
    DatePipe
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task = signal<Task>({} as Task);
  private readonly taskService = inject(TasksService);
  private readonly destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id')!;
    console.log(typeof id)
    this.taskService.getTask(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.task.set(res);
    });
  }
}
