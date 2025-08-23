import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTasks } from "../context/TaskProvider";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { state, add, toggle, updateTitle, remove, refresh } = useTasks();
  const { tasks, loading } = state;

  // Filter: show/hide completed on Home
  const [showCompleted, setShowCompleted] = useState(true);
  const visibleTasks = useMemo(
    () => tasks.filter((t) => (showCompleted ? true : !t.done)),
    [tasks, showCompleted]
  );

  // Add modal
  const [showAdd, setShowAdd] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header row under the app bar */}
      <View style={styles.header}>
        <Text style={styles.h1}>Your Tasks</Text>

        <View style={styles.actions}>
          {/* Refresh */}
          <Pressable
            accessibilityLabel="Refresh tasks"
            onPress={refresh}
            style={styles.iconBtn}
          >
            <Ionicons name="refresh" size={20} color="#374151" />
          </Pressable>

          {/* Toggle show/hide completed */}
          <Pressable
            accessibilityLabel={showCompleted ? "Hide completed" : "Show completed"}
            onPress={() => setShowCompleted((v) => !v)}
            style={styles.iconBtn}
          >
            {showCompleted ? (
              <Ionicons name="eye-off-outline" size={20} color="#374151" />
            ) : (
              <Ionicons name="eye-outline" size={20} color="#374151" />
            )}
          </Pressable>

          {/* Go to Completed list */}
          <Pressable
            accessibilityLabel="Open completed list"
            onPress={() => navigation.navigate("Completed")}
            style={styles.iconBtn}
          >
            <Ionicons name="checkmark-done-outline" size={20} color="#374151" />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : (
        <TaskList
          tasks={visibleTasks}
          onToggle={toggle}
          onUpdateTitle={updateTitle}
          onDelete={remove}
        />
      )}

      {/* Floating Add button */}
      <Pressable
        accessibilityLabel="Add task"
        onPress={() => setShowAdd(true)}
        style={styles.fab}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </Pressable>

      {/* Add modal */}
      <AddTaskModal visible={showAdd} onClose={() => setShowAdd(false)} onAdd={add} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  h1: { fontSize: 20, fontWeight: "700" },

  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});

export default HomeScreen;
