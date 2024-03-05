import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Image, Button } from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entry } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "EntryList">;

const EntryListScreen: React.FC = () => {
  // const entries = useSelector((state: RootState) => state.entries);
  const [entries, setEntries] = useState<Entry[]>([]);

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
    <View style={styles.entryContainer}>
      <View style={styles.leftContainer}>
        <Image
          source={getImageSource(item.image)} // Dynamically load image source
          style={styles.image}
        />
        <Text style={styles.companyName}>{item.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.amount}>
          {item.amount}
          kr
        </Text>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
      </View>
      <View>
        <Button title="Delete" onPress={() => deleteEntry(item.id)} />
      </View>
    </View>
  );

  const deleteEntry = (id: number) => {
    // console.log(id + " deleted");
    fetch(`https://5703-87-61-177-51.ngrok-free.app/entry/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Entry deleted successfully:", data);
        // Handle any success response from the server
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
        // Handle any error that occurs during the fetch request
      });
  };

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

  useEffect(() => {
    fetch("https://5703-87-61-177-51.ngrok-free.app/entry")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setEntries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});

export default EntryListScreen;
