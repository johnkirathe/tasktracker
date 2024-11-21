import {Component, DestroyRef, Inject, inject, OnInit} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {TasksService} from "../../../services/tasks.service";
import {Task} from "../../../models/task";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCheckbox,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatOption,
    MatSelect
  ],
  template: `
    <div class="card bg-white ">
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <mat-card class="bg-white">
          <mat-card-header class="d-flex justify-content-center">
            <h2>Edit Task</h2>
          </mat-card-header>

          <mat-card-content>
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Task Title</mat-label>
                <input matInput formControlName="title" class="text-dark-emphasis"/>
                @if (taskForm.get('title')?.hasError('required')) {
                  <mat-error>Title is required.</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" class="text-dark-emphasis"></textarea>
                @if (taskForm.get('description')?.hasError('required')) {
                  <mat-error>Description is required.</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Priority</mat-label>
                <mat-select formControlName="priority" class="text-dark-emphasis">
                  <mat-option value="low">Low</mat-option>
                  <mat-option value="medium">Medium</mat-option>
                  <mat-option value="high">High</mat-option>
                </mat-select>

                @if (taskForm.get('priority')?.hasError('required')) {
                  <mat-error>Priority is required.</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Due Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="dueDate" class="text-dark-emphasis"/>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                @if (taskForm.get('dueDate')?.hasError('required')) {
                  <mat-error>Due date is required.</mat-error>
                }
              </mat-form-field>
              <mat-checkbox formControlName="completed">Completed</mat-checkbox>
            </div>
          </mat-card-content>
          <mat-card-actions class="d-flex justify-content-center">
            <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid">Submit</button>
            <button type="button" mat-button mat-dialog-close (click)="close()">Close</button>
          </mat-card-actions>
        </mat-card>
      </form>
    </div>
  `,
  styles: []
})
export class TaskDialog implements OnInit {
  private readonly taskService = inject(TasksService);
  private readonly destroyRef = inject(DestroyRef);
  taskForm: FormGroup = {} as FormGroup;
  private readonly fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskDialog>);
  taskId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {
    this.taskId = data.id;
  }

  ngOnInit(): void {
    console.log('data', this.data)
    this.taskForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      priority: [this.data.priority, Validators.required],
      dueDate: [this.data.dueDate, Validators.required],
      completed: [this.data.completed],
    });
  }

  onSubmit() {
    console.log(this.taskForm.value)
    if (this.taskForm.valid) {
      this.taskService.editTask(this.taskId, this.taskForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res); // Pass form data back to the parent component
      });
      this.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
