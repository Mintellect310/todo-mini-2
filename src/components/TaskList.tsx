import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Task } from "../models/Task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle(id: string): void;
  onUpdateTitle(id: string, title: string): void;
  onDelete(id: string): void;
}

// CS: uses FlatList → virtualization lowers render cost vs naive map
const TaskList: React.FC<Props> = ({ tasks, onToggle, onUpdateTitle, onDelete }) => {
  if (!tasks.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggle={() => onToggle(item.id)}
          onUpdateTitle={(title) => onUpdateTitle(item.id, title)}
          onDelete={() => onDelete(item.id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  empty: { padding: 24, alignItems: "center" },
  emptyText: { color: "#666" },
});

export default TaskList;
