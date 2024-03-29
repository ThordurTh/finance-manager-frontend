import React from "react";
import RootNavigator from "./RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Button, StatusBar } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Counter } from "./components/Counter";
import NewEntryScreen from "./screens/NewEntryScreen";
const Tab = createBottomTabNavigator();

// https://icons.expo.fyi/Index
enum iconNames {
  Home = "home",
  HomeOutline = "home-outline",
  Person = "person",
  PersonOutline = "person-outline",
  AddCircle = "add-circle",
  AddCircleOutline = "add-circle-outline",
}

const App = () => {
  return (
    // <RootNavigator />
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              // if (route.name === "Home") {
              //   iconName = focused ? "home" : "home-outline";
              // } else if (route.name === "Profile") {
              //   iconName = focused ? "person" : "person-outline";
              // }
              if (route.name === "Finance Manager") {
                iconName = focused ? iconNames.Home : iconNames.HomeOutline;
              } else if (route.name === "New Entry") {
                iconName = focused
                  ? iconNames.AddCircle
                  : iconNames.AddCircleOutline;
              } else if (route.name === "Profile") {
                iconName = focused ? iconNames.Person : iconNames.PersonOutline;
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
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
