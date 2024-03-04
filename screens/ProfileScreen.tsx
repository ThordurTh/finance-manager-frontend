import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">;

const ProfileScreen = () => {
  return (
    <View style={styles.test}>
      <Text>Profile Screen</Text>

      <StatusBar />
    </View>
  );
};
const styles = StyleSheet.create({
  test: {
    flex: 1,
    // backgroundColor: color,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProfileScreen;
