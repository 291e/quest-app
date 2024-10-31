import { firestore } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export interface QuestData {
  id: string;
  title: string;
  description: string;
  type: "main" | "sub" | "daily";
  status?: "completed" | "in-progress";
}

// 새로운 퀘스트 추가
export const addQuest = async (
  quest: Omit<QuestData, "id">
): Promise<QuestData> => {
  const questRef = await addDoc(collection(firestore, "quests"), quest);
  return { id: questRef.id, ...quest };
};

// 특정 타입의 퀘스트 목록 가져오기
export const fetchQuestsByType = async (type: string): Promise<QuestData[]> => {
  const quests: QuestData[] = [];
  const q = query(collection(firestore, "quests"), where("type", "==", type));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    quests.push({
      id: doc.id,
      title: data.title as string,
      description: data.description as string,
      type: data.type as "main" | "sub" | "daily",
      status: data.status as "completed" | "in-progress" | undefined,
    });
  });
  return quests;
};

// ID로 특정 퀘스트 가져오기
export const fetchQuestById = async (
  questId: string
): Promise<QuestData | null> => {
  const docRef = doc(firestore, "quests", questId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists()
    ? ({ id: docSnap.id, ...docSnap.data() } as QuestData)
    : null;
};

// 퀘스트 상태 업데이트
export const updateQuestStatus = async (
  id: string,
  status: "completed" | "in-progress"
) => {
  await updateDoc(doc(firestore, "quests", id), { status });
};

// 퀘스트 수정
export const updateQuest = async (
  questId: string,
  updatedData: Partial<QuestData>
) => {
  await updateDoc(doc(firestore, "quests", questId), updatedData);
};

// 퀘스트 삭제
export const deleteQuest = async (questId: string) => {
  await deleteDoc(doc(firestore, "quests", questId));
};
