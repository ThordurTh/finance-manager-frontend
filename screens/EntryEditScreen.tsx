import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Modal } from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StackScreenProps } from "@react-navigation/stack";
import { deleteEntry } from "../store/entriesSlice";
import { useDispatch } from "react-redux";

type EntryEditScreenProps = StackScreenProps<RootStackParamList, "EntryEdit">;

interface DeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text>Are you sure?</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Button title="Yes" onPress={onConfirm} />
            <Button title="No" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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

const EntryEditScreen = ({ navigation, route }: EntryEditScreenProps) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [entryIdToDelete, setEntryIdToDelete] = useState(null);

  const handleDeleteEntry = () => {
    // setEntryIdToDelete(entryId);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEntry(entry.id) as any);
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  // const handleDeleteEntry = (entryId: number) => {
  //   dispatch(deleteEntry(entryId) as any);
  // };

  const { entry } = route.params;
  console.log(entry);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{entry.name}</Text>
        <View style={styles.amountImage}>
          <Text style={styles.amount}>
            {entry.incomeExpense === "expense" && "-"}
            {entry.amount} kr
          </Text>
          <Image
            source={getImageSource(entry.category.name)}
            // style={styles.image}
          />
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>
            {entry.date.split("T")[0].replaceAll("-", ".")}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.text}>Time</Text>
          <Text style={styles.text}>
            {entry.date.split("T")[1].slice(0, 5)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.text}>Type</Text>
          <Text style={styles.text}>
            {entry.incomeExpense.charAt(0).toUpperCase() +
              entry.incomeExpense.slice(1)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.text}>Transaction nr.</Text>
          <Text style={styles.text}>4162788432</Text>
        </View>
        <View style={[styles.tableRow, styles.noBorder]}>
          <Text style={styles.text}>Comment</Text>
          <Text style={styles.text}>{entry.comment}</Text>
        </View>
      </View>
      <Button title="Delete Entry?" onPress={() => handleDeleteEntry()} />
      <DeleteModal
        visible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
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
  container: {},
  header: {
    backgroundColor: "#378570",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 28,
    color: "white",
  },
  amountImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginHorizontal: 30,
    marginTop: 5,
  },
  amount: {
    fontSize: 38,
    fontWeight: "500",
    color: "white",
  },
  table: {
    flexDirection: "column",
    marginHorizontal: 20,
    // gap: 24,
    backgroundColor: "#808080",
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
export default EntryEditScreen;
