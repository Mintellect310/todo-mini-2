import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  visible: boolean;
  onClose(): void;
  onAdd(title: string): void;
}

// CS: Single Responsibility: collect input & submit, no business logic
const AddTaskModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [value, setValue] = useState("");

  const submit = () => {
    const title = value.trim();
    if (title.length > 0) {
      onAdd(title);
      setValue("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.h1}>New Task</Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="What do you need to do?"
            style={styles.input}
            onSubmitEditing={submit}
          />
          <View style={styles.actions}>
            <Pressable onPress={onClose} style={[styles.btn, styles.secondary]}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable onPress={submit} style={[styles.btn, styles.primary]}>
              <Text style={{ color: "white" }}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  h1: { fontSize: 18, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  primary: { backgroundColor: "#2563eb" },
  secondary: { backgroundColor: "#eee" },
});

export default AddTaskModal;
