import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button } from "react-native";
import EntryListScreen from "./screens/EntryListScreen";
import EntryEditScreen from "./screens/EntryEditScreen";
import EntryDeleteScreen from "./screens/EntryDeleteScreen";
import { Entry } from "./types";

// Type checking the navigator
export type RootStackParamList = {
  EntryList: undefined;
  EntryEdit: { entry: Entry };
  EntryDelete: { entryId: number };
};

// Tell navigator to use it by passing it as a generic.
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  // const { entryData } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EntryList"
        component={EntryListScreen}
        options={{ title: "All Entries" }}
      />
      <Stack.Screen
        name="EntryEdit"
        component={EntryEditScreen}
        options={{ title: "Edit Entry" }}
      />
      <Stack.Screen
        name="EntryDelete"
        component={EntryDeleteScreen}
        options={{ title: "Delete Entry" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default RootNavigator;
