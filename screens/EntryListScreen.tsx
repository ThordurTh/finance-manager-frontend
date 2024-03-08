import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchEntries } from "../store/entriesSlice";
import { Entry } from "../types";
// import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "EntryList">;

const EntryListScreen = (props: Props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { entries, loading, error } = useSelector(
    (state: RootState) => state.entries
  );

  // const isFocused = useIsFocused(); // Hook provided by react-navigation

  useEffect(() => {
    // if (isFocused) {
    dispatch(fetchEntries() as any);
    // }
  }, [
    dispatch,
    //  isFocused
  ]);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      await dispatch(fetchEntries() as any);
      setIsRefreshing(false);
    }, 700); // 2000 milliseconds = 2 seconds
  };

  // Format date
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-dk", options).format(new Date(date));
  };

  // Each entry
  const renderItem = ({ item }: { item: Entry }) => (
    <TouchableOpacity
      style={styles.entryContainer}
      onPress={() => props.navigation.navigate("EntryEdit", { entry: item })}
    >
      <View style={styles.leftContainer}>
        <Image
          source={getImageSource(item.category.name)}
          style={styles.image}
        />
        <Text style={styles.companyName}>{item.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.amount,
            item.incomeExpense === "expense" && styles.expense,
          ]}
        >
          {item.incomeExpense === "expense" && "-"}
          {item.amount} kr
        </Text>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  // Function to dynamically load image source
  const getImageSource = (imageName: string) => {
    switch (imageName) {
      case "entertainment":
        return require("../assets/category-icons/entertainment.png");
      case "groceries":
        return require("../assets/category-icons/groceries.png");
      case "health":
        return require("../assets/category-icons/health.png");
      case "housing":
        return require("../assets/category-icons/housing.png");
      case "restaurant":
        return require("../assets/category-icons/restaurant.png");
      case "shopping":
        return require("../assets/category-icons/shopping.png");
      case "subscriptions":
        return require("../assets/category-icons/subscriptions.png");
      case "transportation":
        return require("../assets/category-icons/transportation.png");
      case "travel":
        return require("../assets/category-icons/travel.png");
      case "utilities":
        return require("../assets/category-icons/utilities.png");
      default:
        return require("../assets/category-icons/other.png");
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Display your data here */}
      {/* {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : ( */}
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
      {/* )} */}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2DAD00",
  },
  expense: {
    color: "#DF3C3C",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});

export default EntryListScreen;
