export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  done: boolean;
}
