import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../models/Task";
import { TaskRepository } from "./TaskRepository";

const KEY = "TASKS_V1";

export class AsyncStorageTaskRepository implements TaskRepository {
  async getAll(): Promise<Task[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  }

  private async writeAll(tasks: Task[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  }

  async save(task: Task): Promise<void> {
    const tasks = await this.getAll();
    tasks.push(task);
    await this.writeAll(tasks);
  }

  async update(task: Task): Promise<void> {
    const tasks = await this.getAll();
    const next = tasks.map(t => (t.id === task.id ? task : t));
    await this.writeAll(next);
  }

  async remove(id: string): Promise<void> {
    const tasks = await this.getAll();
    const next = tasks.filter(t => t.id !== id);
    await this.writeAll(next);
  }

  async replaceAll(tasks: Task[]): Promise<void> {
    await this.writeAll(tasks);
  }
}
