import React, { useEffect, useState } from "react";
import RootNavigator from "../RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from "@expo/vector-icons";
import NewEntryScreen from "../screens/NewEntryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import LogoutScreen from "./LogoutScreen";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SignupScreen from "./SignupScreen";
import CameraTest from "./CameraTest";

const Tab = createBottomTabNavigator();

// https://icons.expo.fyi/Index
enum iconNames {
  Home = "home",
  HomeOutline = "home-outline",
  Person = "person",
  PersonOutline = "person-outline",
  AddCircle = "add-circle",
  AddCircleOutline = "add-circle-outline",
  Logout = "log-out",
  LogoutOutline = "log-out-outline",
}
const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  const loggedIn = useSelector((state: RootState) => state.users.loggedIn);
  console.log("Is logged in: " + loggedIn);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Finance Manager") {
                iconName = focused ? iconNames.Home : iconNames.HomeOutline;
              } else if (route.name === "New Entry") {
                iconName = focused
                  ? iconNames.AddCircle
                  : iconNames.AddCircleOutline;
              } else if (route.name === "Profile") {
                iconName = focused ? iconNames.Person : iconNames.PersonOutline;
              } else if (route.name === "Logout") {
                iconName = focused ? iconNames.Logout : iconNames.LogoutOutline;
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#1dc195",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Finance Manager" component={RootNavigator} />
          <Tab.Screen name="New Entry" component={NewEntryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Logout" component={LogoutScreen} />
          <Tab.Screen name="Camera" component={CameraTest} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: "Register" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
