export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  done: boolean;
  // CS: could add dueDate: number | null; priority: 0..2 etc; keeps model open for extension
}
