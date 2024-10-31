// src/screens/QuestListScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuests,
  markQuestComplete,
  removeQuest,
} from "../store/slices/questSlice";
import { RootState, AppDispatch } from "../store/store";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import Gap from "../components/Gap";
import { RootStackParamList } from "../navigation/types";

type QuestListScreenRouteProp = RouteProp<RootStackParamList, "QuestList">;
type QuestListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QuestEdit"
>;

export default function QuestListScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<QuestListScreenNavigationProp>();
  const { quests, loading, error } = useSelector(
    (state: RootState) => state.quests
  );

  const [selectedQuest, setSelectedQuest] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "in-progress"
  >("all");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "main" | "sub" | "daily"
  >("all");

  useEffect(() => {
    dispatch(fetchQuests("all"));
  }, [dispatch]);

  const handleCompleteToggle = (id: string) => {
    const quest = quests.find((q) => q.id === id);
    if (quest) {
      const newStatus =
        quest.status === "completed" ? "in-progress" : "completed";
      dispatch(markQuestComplete({ id, status: newStatus }));
    }
  };

  const openModal = (quest: {
    id: string;
    title: string;
    description: string;
  }) => {
    setSelectedQuest(quest);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedQuest(null);
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (selectedQuest) {
      Alert.alert("퀘스트 삭제", "정말로 삭제하시겠습니까?", [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            dispatch(removeQuest(selectedQuest.id));
            closeModal();
          },
        },
      ]);
    }
  };

  const handleEdit = () => {
    if (selectedQuest) {
      closeModal();
      navigation.navigate("QuestEdit", { questId: selectedQuest.id });
    }
  };

  const filteredQuests = quests
    .filter((quest) =>
      quest.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((quest) => {
      if (statusFilter === "completed") return quest.status === "completed";
      if (statusFilter === "in-progress") return quest.status !== "completed";
      return true;
    })
    .filter((quest) => {
      if (typeFilter !== "all") return quest.type === typeFilter;
      return true;
    });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {error && <Text style={styles.error}>{error}</Text>}

          <Gap gap={0} direction="horizontal" style={styles.buttonGroup}>
            <CustomButton
              label="전체"
              onPress={() => setStatusFilter("all")}
              color={statusFilter === "all" ? "#4CAF50" : "#ccc"}
            />
            <CustomButton
              label="진행 중"
              onPress={() => setStatusFilter("in-progress")}
              color={statusFilter === "in-progress" ? "#4CAF50" : "#ccc"}
            />
            <CustomButton
              label="완료"
              onPress={() => setStatusFilter("completed")}
              color={statusFilter === "completed" ? "#4CAF50" : "#ccc"}
            />
          </Gap>

          <Gap gap={0} direction="horizontal" style={styles.buttonGroup}>
            <CustomButton
              label="전체"
              onPress={() => setTypeFilter("all")}
              color={typeFilter === "all" ? "#4CAF50" : "#ccc"}
            />
            <CustomButton
              label="메인"
              onPress={() => setTypeFilter("main")}
              color={typeFilter === "main" ? "#4CAF50" : "#ccc"}
            />
            <CustomButton
              label="서브"
              onPress={() => setTypeFilter("sub")}
              color={typeFilter === "sub" ? "#4CAF50" : "#ccc"}
            />
            <CustomButton
              label="일일"
              onPress={() => setTypeFilter("daily")}
              color={typeFilter === "daily" ? "#4CAF50" : "#ccc"}
            />
          </Gap>

          <TextInput
            style={styles.searchInput}
            placeholder="퀘스트 검색"
            value={searchText}
            onChangeText={setSearchText}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddQuest")}
          >
            <Text style={styles.addButtonText}>퀘스트 추가</Text>
          </TouchableOpacity>

          <FlatList
            data={filteredQuests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={styles.questItem}>
                  <Text
                    style={
                      item.status === "completed" ? styles.completed : undefined
                    }
                  >
                    {item.title}
                  </Text>
                  <Ionicons
                    name={
                      item.status === "completed"
                        ? "checkbox"
                        : "square-outline"
                    }
                    size={24}
                    color={item.status === "completed" ? "#4CAF50" : "#ccc"}
                    onPress={() => handleCompleteToggle(item.id)}
                  />
                </View>
              </TouchableOpacity>
            )}
          />

          {selectedQuest && (
            <Modal
              style={styles.modalContainer}
              isVisible={modalVisible}
              onBackdropPress={closeModal}
              animationIn="fadeIn"
              animationOut="fadeOut"
            >
              <View style={styles.modalContent}>
                <Text style={styles.title}>{selectedQuest.title}</Text>
                <Text>{selectedQuest.description}</Text>
                <Button title="수정" onPress={handleEdit} />
                <Button title="삭제" color="red" onPress={handleDelete} />
                <Button title="닫기" onPress={closeModal} />
              </View>
            </Modal>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  error: { color: "red", marginBottom: 10 },
  searchInput: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  buttonGroup: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  questItem: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completed: { textDecorationLine: "line-through", color: "gray" },
  addButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  addButtonText: { color: "white", fontWeight: "bold" },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
