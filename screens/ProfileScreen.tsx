import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import PieChart from "react-native-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchEntries, updateCategoryCounts } from "../store/entriesSlice";

// type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">;

const widthAndHeight = 300;
let series: number[] = Array(11).fill(0);

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { entries, categoryCounts } = useSelector(
    (state: RootState) => state.entries
  );
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  useEffect(() => {
    entries.forEach((entry, index) => {
      series[entry.category.id - 1]++;
      index === entries.length - 1 && setCategoriesLoaded(true);
    });
    dispatch(updateCategoryCounts(series));
  }, [entries, dispatch]);

  interface CategoryPair {
    title: string;
    color: string;
  }

  const categories: CategoryPair[] = [
    {
      title: "entertainment",
      color: "#55E0BB",
    },
    {
      title: "groceries",
      color: "#F5754E",
    },
    {
      title: "health",
      color: "#A07568",
    },
    {
      title: "housing",
      color: "#678F84",
    },
    {
      title: "other",
      color: "#23332F",
    },
    {
      title: "restaurant",
      color: "#4B403D",
    },
    {
      title: "shopping",
      color: "#515C59",
    },
    {
      title: "subscriptions",
      color: "#B5E4D9",
    },
    {
      title: "transportation",
      color: "#756560",
    },
    {
      title: "travel",
      color: "#CA7B62",
    },
    {
      title: "utilities",
      color: "#65C2A9",
    },
  ];
  const renderItem = ({ item }: { item: CategoryPair }) => (
    <View style={styles.listItem}>
      <View style={[styles.square, { backgroundColor: item.color }]}></View>
      <Text style={styles.listText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.test}>
      {/* <ScrollView style={{ flex: 1 }}> */}
      <View style={styles.container}>
        <Text style={styles.title}>Statistics</Text>
        {categoriesLoaded === false ? (
          <Text>Loading...</Text>
        ) : (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={categoryCounts}
            sliceColor={categories.map((item) => item.color)}
            coverRadius={0.45}
            coverFill={"#FFF"}
          />
        )}
      </View>
      {/* </ScrollView> */}
      <View style={styles.list}>
        <FlatList
          numColumns={11}
          // horizontal={true}
          data={categories}
          renderItem={renderItem}
        />
      </View>
      <StatusBar />
    </View>
  );
};
const styles = StyleSheet.create({
  test: {
    // flex: 1,
    // backgroundColor: color,
    // alignItems: "center",
    // justifyContent: "center",
  },
  container: {
    // flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  list: {
    // alignItems: "center",
    // flex: 1,
    // flexDirection: "row",
    height: 600,
    // marginTop: 40,
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    width: 30,
    height: 190,
    transform: "rotate(-55deg)",
    // marginBottom: 30,
    // borderWidth: 1,
    // paddingRight: 0,
  },
  listText: {
    fontSize: 14,
    marginLeft: 3,
    width: 100,
  },
  square: {
    width: 20,
    height: 20,
  },
});
export default ProfileScreen;
