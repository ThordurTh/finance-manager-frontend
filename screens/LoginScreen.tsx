import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";
import * as SecureStore from "expo-secure-store";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [loginClicked, setloginClicked] = useState(false);
  const token = useSelector((state: RootState) => state.users.token);

  const handleLogin = () => {
    setloginClicked(true);
    if (username !== "" || password !== "") {
      dispatch(login({ username: username, password: password }));
    }
  };

  // useEffect(() => {
  //   async function readFromSecureStore() {
  //     const token = await SecureStore.getItemAsync("token");
  //   }
  // });

  useEffect(() => {
    SecureStore.setItemAsync("token", token || "");
    // readDataFromSecureStore();
  }, [token]);

  // const readDataFromSecureStore = async () => {
  //   const data = await SecureStore.getItemAsync("token");
  //   console.log("Data from SecureStore:", data);
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
          onPress={handleLogin}
          style={[styles.login]}
          //   style={[styles.addEntry, isButtonDisabled && styles.buttonDisabled]}
          //   disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
});

export default LoginScreen;
