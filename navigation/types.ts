export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  QuestList: { type: "main" | "sub" | "daily" };
  QuestEdit: { questId: string };
  Profile: undefined;
  AddQuest: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  QuestList: { type: "main" | "sub" | "daily" };
  Profile: undefined;
};
