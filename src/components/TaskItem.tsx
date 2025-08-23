import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Task } from "../models/Task";

interface Props {
  task: Task;
  onToggle(): void;
  onUpdateTitle(title: string): void;
  onDelete(): void;
  showStrikeThrough?: boolean;
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onUpdateTitle, onDelete, showStrikeThrough = true }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [
          styles.checkbox,
          pressed && { transform: [{ scale: 0.95 }], opacity: 0.8 },
        ]}
        android_ripple={{ color: "#e5e7eb", borderless: false }}
      >
        <Text style={styles.checkmark}>{task.done ? "✔︎" : ""}</Text>
      </Pressable>

      {editing ? (
        <TextInput
          style={[styles.title, styles.input]}
          value={value}
          onChangeText={setValue}
          onBlur={() => {
            setEditing(false);
            if (value.trim() && value !== task.title) onUpdateTitle(value.trim());
            else setValue(task.title);
          }}
          autoFocus
        />
      ) : (
        <Pressable onLongPress={() => setEditing(true)} style={{ flex: 1 }}>
          <Text style={[styles.title, task.done && showStrikeThrough && styles.done, task.done && !showStrikeThrough && styles.grey]} numberOfLines={2}>
            {task.title}
          </Text>
        </Pressable>
      )}

      <Pressable
        onPress={onDelete}
        style={({ pressed }) => [
          styles.deleteBtn,
          pressed && { transform: [{ scale: 0.95 }], opacity: 0.8 },
        ]}
        android_ripple={{ color: "#fecaca", borderless: true, radius: 18 }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    gap: 10,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: { fontSize: 16 },
  title: { flex: 1, fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#888" },
  grey: { color: "#666" },
  input: {
    borderBottomWidth: 1,
    borderColor: "#aaa",
    paddingVertical: 4,
  },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: { fontSize: 18, color: "#c33" },
});

export default TaskItem;
