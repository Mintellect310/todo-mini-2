import { useEffect, useMemo, useState } from "react";
import { Task } from "../models/Task";
import { TaskRepository } from "../repo/TaskRepository";

export interface TaskVM {
  state: {
    tasks: Task[];
    loading: boolean;
    error: string | null;
  };
  add(title: string): Promise<void>;
  toggle(id: string): Promise<void>;
  updateTitle(id: string, title: string): Promise<void>;
  remove(id: string): Promise<void>;
  clearCompleted(): Promise<void>;
  refresh(): Promise<void>;
}

function uuid() {
  return Math.random().toString(36).slice(2, 10);
}

export function useTaskViewModel(repo: TaskRepository): TaskVM {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const all = await repo.getAll();
      setTasks(all);
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (title: string) => {
    const task: Task = { id: uuid(), title, done: false };
    const next = [...tasks, task];
    setTasks(next);
    await repo.save(task);
  };

  const toggle = async (id: string) => {
    const next = tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t));
    setTasks(next);
    const changed = next.find(t => t.id === id)!;
    await repo.update(changed);
  };

  const updateTitle = async (id: string, title: string) => {
    const next = tasks.map(t => (t.id === id ? { ...t, title } : t));
    setTasks(next);
    const changed = next.find(t => t.id === id)!;
    await repo.update(changed);
  };

  const remove = async (id: string) => {
    const next = tasks.filter(t => t.id !== id);
    setTasks(next);
    await repo.remove(id);
  };

  const clearCompleted = async () => {
    const next = tasks.filter(t => !t.done);
    setTasks(next);
    await repo.replaceAll(next);
  };

  const refresh = async () => load();

  return useMemo(
    () => ({
      state: { tasks, loading, error },
      add,
      toggle,
      updateTitle,
      remove,
      clearCompleted,
      refresh,
    }),
    [tasks, loading, error]
  );
}
