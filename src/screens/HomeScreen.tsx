import React, { useLayoutEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
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

  const [showCompleted, setShowCompleted] = useState(true);
  const visibleTasks = useMemo(
    () => tasks.filter((t) => (showCompleted ? true : !t.done)),
    [tasks, showCompleted]
  );

  const [showAdd, setShowAdd] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Tasks",
      headerRight: () => (
        <View style={styles.headerActions}>
          {/* Refresh Tasks */}
          <Pressable
            accessibilityLabel="Refresh tasks"
            onPress={refresh}
            android_ripple={{ color: "#c7d2fe", borderless: true, radius: 22 }}
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && styles.iconBtnPressed,
            ]}
          >
            <Ionicons name="refresh" size={22} color="#1f2937" />
          </Pressable>

          {/* Show/Hide Completed Tasks */}
          <Pressable
            accessibilityLabel={showCompleted ? "Hide completed" : "Show completed"}
            onPress={() => setShowCompleted((v) => !v)}
            style={styles.iconBtn}
          >
            {showCompleted ? (
              <Ionicons name="eye-off-outline" size={22} color="#374151" />
            ) : (
              <Ionicons name="eye-outline" size={22} color="#374151" />
            )}
          </Pressable>

          {/* Open Completed Tasks */}
          <Pressable
            accessibilityLabel="Open completed list"
            onPress={() => navigation.navigate("Completed")}
            style={styles.iconBtn}
          >
            <Ionicons name="checkmark-done-outline" size={22} color="#374151" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, refresh, showCompleted]);

  return (
    <SafeAreaView style={styles.container}>
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
        android_ripple={{ color: "#93c5fd", radius: 28 }}
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressed,
        ]}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </Pressable>

      <AddTaskModal visible={showAdd} onClose={() => setShowAdd(false)} onAdd={add} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  headerActions: {
    flexDirection: "row",
    gap: 8,
    marginRight: 2,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef2ff",
  },
  iconBtnPressed: {
    backgroundColor: "#e0e7ff",
    transform: [{ scale: 0.96 }],
  },

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
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  fabPressed: {
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.12,
  },
});

export default HomeScreen;
