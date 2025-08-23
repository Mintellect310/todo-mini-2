import React, { createContext, useContext, useMemo } from "react";
import { AsyncStorageTaskRepository } from "../repo/AsyncStorageTaskRepository";
import { useTaskViewModel, TaskVM } from "../viewmodel/taskViewModel";

const TaskContext = createContext<TaskVM | null>(null);

export const TaskProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const repo = useMemo(() => new AsyncStorageTaskRepository(), []);
  const vm = useTaskViewModel(repo);
  return <TaskContext.Provider value={vm}>{children}</TaskContext.Provider>;
};

export function useTasks() {
  const vm = useContext(TaskContext);
  if (!vm) throw new Error("useTasks must be used within TaskProvider");
  return vm;
}
