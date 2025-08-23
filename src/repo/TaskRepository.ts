import { Task } from "../models/Task";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  save(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  remove(id: string): Promise<void>;
  replaceAll(tasks: Task[]): Promise<void>;
}
