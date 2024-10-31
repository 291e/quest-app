import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import AuthStackNavigator from "./AuthStackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import AddQuestScreen from "../screens/AddQuestScreen";
import QuestEditScreen from "../screens/QuestEditScreen";

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="AddQuest" component={AddQuestScreen} />
      <Stack.Screen name="QuestEdit" component={QuestEditScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
