import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import { RootState } from "../store/store";

export function Entry() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.entry}>
      <View style={styles.iconName}>
        <Image
          source={require("../assets/category-icons/groceries.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.name}>Netto</Text>
      </View>

      <View style={styles.amountDate}>
        <Text>-149kr</Text>
        <Text>4/3/2024</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  entry: {
    flex: 1,
    backgroundColor: "lightblue",
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 300,
    flexDirection: "row",
    width: "100%",
  },
  iconName: {
    flexDirection: "row",
  },
  name: {
    alignSelf: "center",
  },
  amountDate: {
    marginLeft: "auto",
  },
});
