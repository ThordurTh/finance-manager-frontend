import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { RootStackEntryParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

type Props = NativeStackScreenProps<RootStackEntryParamList, "EntryDelete">;

const EntryDeleteScreen = (props: Props) => {
  return (
    <View style={styles.test}>
      <Text>Are you Sure?</Text>
      <Button
        title="Yes"
        onPress={() => props.navigation.navigate("EntryList")}
      />
      <Button
        title="No"
        onPress={() => props.navigation.navigate("EntryList")}
      />
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
export default EntryDeleteScreen;
