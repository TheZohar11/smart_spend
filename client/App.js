import { StatusBar } from "expo-status-bar";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Landing from "./screens/Landing";

const Stack = createNativeStackNavigator();

function RootStack() {
  <Stack.Navigator
    initialRouteName="Landing"
    screenOptions={{ headerStyle: { backgroundColor: "tomato" } }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="Landing"
      component={Landing}
      options={{ title: "Welcome" }}
    />
  </Stack.Navigator>;
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
