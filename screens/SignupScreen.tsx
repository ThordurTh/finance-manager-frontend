import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";
import * as SecureStore from "expo-secure-store";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [loginClicked, setloginClicked] = useState(false);
  const token = useSelector((state: RootState) => state.users.token);

  const handleSignup = () => {
    setloginClicked(true);
    if (username !== "" || password !== "") {
      dispatch(signup({ username: username, password: password }));
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    SecureStore.setItemAsync("token", token || "");
    // readDataFromSecureStore();
  }, [token]);

  // const readDataFromSecureStore = async () => {
  //   const tokenFromSecureStore = await SecureStore.getItemAsync("token");
  //   const userIdFromSecureStore = await SecureStore.getItemAsync("userId");
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={
              loginClicked && username === ""
                ? [styles.input, styles.error]
                : styles.input
            }
            placeholder="Username"
            value={username}
            autoCapitalize="none"
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.login]}
          //   style={[styles.addEntry, isButtonDisabled && styles.buttonDisabled]}
          //   disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.signUp}>
          <Button
            onPress={() => navigation.navigate("Login")}
            title="Already have an account?"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  inputWrapper: {
    width: "100%",
  },
  input: {
    height: 60,
    width: "100%",
    backgroundColor: "#D9D9D9",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    justifyContent: "center",
  },
  error: {
    borderColor: "red",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    color: "#474747",
    marginBottom: 0,
  },
  login: {
    backgroundColor: "#55E0BB",
    borderRadius: 10,
    width: "100%",
    padding: 20,
    marginTop: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#569e8b",
  },
  buttonText: {
    fontSize: 18,
  },
  signUp: {
    alignSelf: "center",
    marginTop: 10,
  },
});

export default SignupScreen;
