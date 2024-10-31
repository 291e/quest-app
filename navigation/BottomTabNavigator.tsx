// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import QuestListScreen from "../screens/QuestListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { BottomTabParamList } from "./types";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="QuestList"
        options={{
          title: "QuestList",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        component={QuestListScreen}
        initialParams={{ type: "daily" }}
      />
      <Tab.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
