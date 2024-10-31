// src/screens/QuestEditScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestById, updateQuestData } from "../store/slices/questSlice";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { AppDispatch, RootState } from "../store/store";

type QuestEditScreenRouteProp = RouteProp<RootStackParamList, "QuestEdit">;

const QuestEditScreen = () => {
  const route = useRoute<QuestEditScreenRouteProp>();
  const { questId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const quest = useSelector((state: RootState) =>
    state.quests.quests.find((quest) => quest.id === questId)
  );
  const [title, setTitle] = useState(quest?.title || "");
  const [description, setDescription] = useState(quest?.description || "");

  useEffect(() => {
    if (!quest) {
      dispatch(fetchQuestById(questId));
    }
  }, [dispatch, questId, quest]);

  const handleUpdate = () => {
    dispatch(updateQuestData({ id: questId, title, description }));
    Alert.alert("퀘스트가 업데이트되었습니다.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>퀘스트 수정</Text>
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
      <Button title="퀘스트 수정 완료" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
});

export default QuestEditScreen;
