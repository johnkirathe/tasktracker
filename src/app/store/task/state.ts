import {Task} from "../../models/task";

export interface TaskState {
  tasks: Task[] | null;
  isSubmitting: boolean;
  validationErrors: unknown;
}

export const initialState: TaskState = {
  tasks: [],
  isSubmitting: false,
  validationErrors: null
}
