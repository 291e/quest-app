import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchQuestsByType,
  fetchQuestById as fetchQuestFromFirestore,
  addQuest,
  updateQuest,
  deleteQuest,
  updateQuestStatus,
} from "../../services/firestoreService";

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: "main" | "sub" | "daily";
  status?: "completed" | "in-progress";
}

interface QuestState {
  quests: Quest[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestState = {
  quests: [],
  loading: false,
  error: null,
};

// 비동기 액션들
export const fetchQuests = createAsyncThunk(
  "quests/fetchQuests",
  async (type: string) => {
    return await fetchQuestsByType(type);
  }
);

export const fetchQuestById = createAsyncThunk(
  "quests/fetchQuestById",
  async (questId: string) => {
    return await fetchQuestFromFirestore(questId);
  }
);

export const addNewQuest = createAsyncThunk(
  "quests/addNewQuest",
  async (quest: Omit<Quest, "id">) => {
    return await addQuest(quest);
  }
);

export const markQuestComplete = createAsyncThunk(
  "quests/markQuestComplete",
  async ({
    id,
    status,
  }: {
    id: string;
    status: "completed" | "in-progress";
  }) => {
    await updateQuestStatus(id, status);
    return { id, status };
  }
);

export const updateQuestData = createAsyncThunk(
  "quests/updateQuest",
  async ({ id, ...updatedData }: { id: string } & Partial<Quest>) => {
    await updateQuest(id, updatedData);
    return { id, ...updatedData };
  }
);

export const removeQuest = createAsyncThunk(
  "quests/deleteQuest",
  async (questId: string) => {
    await deleteQuest(questId);
    return questId;
  }
);

// 슬라이스 정의
const questSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchQuests.fulfilled,
        (state, action: PayloadAction<Quest[]>) => {
          state.loading = false;
          state.quests = action.payload;
        }
      )
      .addCase(fetchQuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unknown error occurred";
      })
      .addCase(addNewQuest.fulfilled, (state, action: PayloadAction<Quest>) => {
        state.quests.push(action.payload);
      })
      .addCase(
        markQuestComplete.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: string;
            status: "completed" | "in-progress" | undefined;
          }>
        ) => {
          const quest = state.quests.find((q) => q.id === action.payload.id);
          if (quest) quest.status = action.payload.status;
        }
      )
      .addCase(
        updateQuestData.fulfilled,
        (state, action: PayloadAction<Partial<Quest> & { id: string }>) => {
          const index = state.quests.findIndex(
            (quest) => quest.id === action.payload.id
          );
          if (index !== -1)
            state.quests[index] = { ...state.quests[index], ...action.payload };
        }
      )
      .addCase(
        removeQuest.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.quests = state.quests.filter(
            (quest) => quest.id !== action.payload
          );
        }
      );
  },
});

export default questSlice.reducer;
