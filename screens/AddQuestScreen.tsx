// src/screens/AddQuestScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addNewQuest } from "../store/slices/questSlice";
import { AppDispatch } from "../store/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import BackButton from "../components/BackButton";

type AddQuestScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QuestList"
>;

export default function AddQuestScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"main" | "sub" | "daily">("daily");

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<AddQuestScreenNavigationProp>();

  const handleAddQuest = () => {
    dispatch(addNewQuest({ title, description, type }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BackButton size={28} />
      <Text style={styles.title}>퀘스트 추가</Text>
      <TextInput
        style={styles.input}
        placeholder="퀘스트 제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="퀘스트 설명"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.typeSelector}>
        {["main", "sub", "daily"].map((questType) => (
          <TouchableOpacity
            key={questType}
            style={[
              styles.typeButton,
              type === questType && styles.selectedTypeButton,
            ]}
            onPress={() => setType(questType as "main" | "sub" | "daily")}
          >
            <Text style={styles.typeButtonText}>{questType.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddQuest}>
        <Text style={styles.addButtonText}>퀘스트 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  typeButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  selectedTypeButton: {
    backgroundColor: "#4CAF50",
  },
  typeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  addButtonText: { color: "white", fontWeight: "bold" },
});
