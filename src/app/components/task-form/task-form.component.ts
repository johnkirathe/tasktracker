import {Component, DestroyRef, inject, signal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Task} from "../../models/task";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {TasksService} from "../../services/tasks.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-task-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    ReactiveFormsModule,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatCheckbox,
    MatCardActions,
    MatError,
    MatLabel,
    MatDivider,
    MatIcon,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatSelect, MatOption
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup = {} as FormGroup;
  fb = inject(FormBuilder);
  private readonly taskService = inject(TasksService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      dueDate: ['', [Validators.required]],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      this.taskService.addTask(task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
        console.log(res);
      });
      this.taskForm.reset();
      this.router.navigate(['/tasks']);
    }
  }
}
