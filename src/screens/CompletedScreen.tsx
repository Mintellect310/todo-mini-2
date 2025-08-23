import React, { useMemo } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { useTasks } from "../context/TaskProvider";
import TaskList from "../components/TaskList";

const CompletedScreen: React.FC = () => {
  const { state, toggle, updateTitle, remove } = useTasks();
  const { tasks } = state;

  const doneTasks = useMemo(() => tasks.filter(t => t.done), [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      {doneTasks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No completed tasks yet.</Text>
        </View>
      ) : (
        <TaskList
          tasks={doneTasks}
          onToggle={(id) => toggle(id)}
          onUpdateTitle={(id, title) => updateTitle(id, title)}
          onDelete={(id) => remove(id)}
          showStrikeThrough={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#666" },
});

export default CompletedScreen;
