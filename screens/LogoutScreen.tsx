import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RootStackEntryParamList } from "../RootNavigator";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { resetUserState } from "../store/userSlice";

const LogoutScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Clear authentication state
      dispatch(resetUserState()); // Dispatch action to reset user state

      // Remove token from SecureStore
      await SecureStore.deleteItemAsync("token");

      // Navigate to login screen or initial authentication-related screen
      // You can use navigation libraries like React Navigation to navigate
      // For example, if you're using React Navigation's useNavigation hook:
      // navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
    } // readDataFromSecureStore();
  };

  //   const readDataFromSecureStore = async () => {
  //     const tokenFromSecureStore = await SecureStore.getItemAsync("token");
  //     // const userIdFromSecureStore = await SecureStore.getItemAsync("userId");
  //     console.log(tokenFromSecureStore);
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default LogoutScreen;
