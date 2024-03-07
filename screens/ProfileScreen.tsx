import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import PieChart from "react-native-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchEntries, updateCategoryCounts } from "../store/entriesSlice";

// type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">;

const widthAndHeight = 300;
let series: number[] = Array(11).fill(1);
// let series: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const sliceColor = [
  "#55E0BB",
  "#4ECFAC",
  "#56E3BD",
  "#48BD9E",
  "#40A88C",
  "#39967E",
  "#32856F",
  "#2B705E",
  "#245E4F",
  "#1D4C40",
  "#163B31",
];

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { entries, categoryCounts } = useSelector(
    (state: RootState) => state.entries
  );

  useEffect(() => {
    entries.forEach((entry) => {
      series[entry.category.id - 1]++;
    });
    // console.log(series);
    dispatch(updateCategoryCounts(series));
    // console.log("categoryCounts is: " + categoryCounts);
  }, [entries, dispatch]);

  return (
    <View style={styles.test}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Doughnut</Text>

          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
            coverFill={"#FFF"}
          />
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
export default ProfileScreen;
