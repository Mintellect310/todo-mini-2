import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskProvider } from "./src/context/TaskProvider";
import HomeScreen from "./src/screens/HomeScreen";
import CompletedScreen from "./src/screens/CompletedScreen";

export type RootStackParamList = {
  Home: undefined;
  Completed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Todo Mini",
              headerStyle: { backgroundColor: "#eef2ff" },
              headerTitleStyle: { color: "#2563eb", fontWeight: "800" },
              headerTintColor: "#2563eb",
            }}
          />
          <Stack.Screen
            name="Completed"
            component={CompletedScreen}
            options={{
              title: "Completed Tasks",
              headerStyle: { backgroundColor: "#eef2ff" },
              headerTitleStyle: { color: "#2563eb", fontWeight: "800" },
              headerTintColor: "#2563eb",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
