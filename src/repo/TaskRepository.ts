import { Task } from "../models/Task";

// CS: interface-based design; UI depends on abstraction, not storage (Dependency Inversion)
export interface TaskRepository {
  getAll(): Promise<Task[]>;
  save(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  remove(id: string): Promise<void>;
  replaceAll(tasks: Task[]): Promise<void>; // convenience for bulk writes
}
