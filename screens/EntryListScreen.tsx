import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

type Props = NativeStackScreenProps<RootStackParamList, "EntryList">;

// import { StackNavigationProp } from '@react-navigation/stack';

// type HomeScreenProps = {
//   navigation: StackNavigationProp<{}>;
// };

// const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {  return (
const EntryListScreen = (props: Props) => {
  return (
    <View style={styles.test}>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Another Screen"
        onPress={() => props.navigation.navigate("EntryEdit", { entryId: 1 })}
      />
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
    // marginTop: 300,
  },
});
export default EntryListScreen;
