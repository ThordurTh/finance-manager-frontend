import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { addNewEntry } from "../store/entriesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store/store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ModalContent } from "../components/MustBeAdminModal";
// import { Picture } from "../components/Picture";
// import { addTransaction } from './redux/transactionsSlice';

interface TransactionFormProps {}

type ParamListBase = {
  "Finance Manager": undefined;
  "New Entry": undefined;
  Profile: undefined;
  Logout: undefined;
};

const TransactionForm: React.FC<TransactionFormProps> = () => {
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<string>("income");
  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isCategoryModalVisible, setIsCategoryModalVisible] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const [camera, setCamera] = useState(false);
  const [photoToDisplay, setPhotoToDisplay] = useState("");
  const entries = useSelector((state: RootState) => state.entries.entries);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch<AppDispatch>();

  const isButtonDisabled =
    amount === "" || name === "" || selectedCategory === "";

  const handleNewEntry = async () => {
    try {
      await dispatch(
        addNewEntry({
          amount: Number(amount),
          date: date.toISOString(),
          currency: "DKK",
          name,
          comment,
          incomeExpense: type,
          categoryName: selectedCategory.toLowerCase(),
          // photoToDisplay
        })
      );

      // Clear input fields on successful entry addition
      setAmount("");
      setDate(new Date());
      setName("");
      setComment("");
      setSelectedCategory("");
      navigation.navigate("Finance Manager");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalVisible(!isCategoryModalVisible);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    toggleCategoryModal();
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const categories = [
    { label: "Groceries", value: "groceries" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Health", value: "health" },
    { label: "Housing", value: "housing" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Shopping", value: "shopping" },
    { label: "Subscriptions", value: "subscriptions" },
    { label: "Transportation", value: "transportation" },
    { label: "Travel", value: "travel" },
    { label: "Utilities", value: "utilities" },
    { label: "Other", value: "other" },
  ];

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

  const renderCategoryItem = ({
    item,
  }: {
    item: { label: string; value: string };
  }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => selectCategory(item.label)}
    >
      <Image
        source={getImageSource(item.value)}
        // style={styles.image}
      />
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-dk", options).format(new Date(date));
  };

  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserRole = async () => {
        const role = await SecureStore.getItemAsync("role");
        if (role !== "admin") {
          setModalVisible(true);
        } else {
          setModalVisible(false);
        }
      };
      fetchUserRole();
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={styles.container}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Amount"
            value={amount.toString()}
            onChangeText={(text) => setAmount(text)}
          />
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                type === "income" ? styles.selectedRadioButton : null,
              ]}
              onPress={() => setType("income")}
            >
              <Text>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                type === "expense" ? styles.selectedRadioButton : null,
              ]}
              onPress={() => setType("expense")}
            >
              <Text>Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.dateInput}>
              <TouchableOpacity
                style={styles.date}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text style={styles.dateText}>
                  {formatDate(date.toISOString()).split(" ")[0]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.date}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text style={styles.dateText}>
                  {formatDate(date.toISOString()).split(" ")[1]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.date}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text style={styles.dateText}>
                  {formatDate(date.toISOString()).split(" ")[2]}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={() => setDatePickerVisibility(false)}
              textColor="black"
              date={date}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Comment</Text>
            <TextInput
              style={styles.input}
              placeholder="Comment"
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Category</Text>

            <TouchableOpacity
              style={styles.categoryInput}
              onPress={toggleCategoryModal}
            >
              <Text style={styles.categoryInputText}>
                {selectedCategory ? selectedCategory : "Select Category"}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={isCategoryModalVisible}
              animationType="slide"
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.value}
                    numColumns={2}
                  />
                </View>
              </View>
            </Modal>
          </View>

          {/* <View>
            {camera ? (
              <Picture
                setCamera={setCamera}
                setPhotoToDisplay={setPhotoToDisplay}
              ></Picture>
            ) : (
              <>
                <Image
                  source={{ uri: entries[0]?.photo }}
                  style={{ width: 400, height: 400 }}
                />

                <Button title="Open camera" onPress={() => setCamera(true)} />
              </>
            )}
          </View> */}

          <TouchableOpacity
            onPress={handleNewEntry}
            style={[styles.addEntry, isButtonDisabled && styles.buttonDisabled]}
            disabled={isButtonDisabled}
          >
            <Text style={styles.buttonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <ModalContent onClose={toggleModal} />
        </Modal>
      </>
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
    // borderColor: "#474747",
    backgroundColor: "#D9D9D9",
    // borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#474747",
    marginBottom: 0,
  },
  dateWrapper: {
    width: "100%",
  },
  dateInput: {
    flexDirection: "row",
    gap: 10,
  },
  date: {
    flex: 1,
    height: 60,
    // borderColor: "#474747",
    // borderWidth: 1,
    backgroundColor: "#D9D9D9",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  radioButton: {
    // borderWidth: 1,
    // borderColor: "#474747",
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedRadioButton: {
    backgroundColor: "#55E0BB",
    // borderColor: "#55E0BB",
  },
  categoryInput: {
    height: 60,
    width: "100%",
    // borderColor: "#474747",
    backgroundColor: "#D9D9D9",
    // borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 10,
  },
  categoryInputText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "100%",
    paddingBottom: 30,
  },

  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // width: "40%",
    padding: 13,
    marginBottom: 3,
    backgroundColor: "#55E0BB",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  addEntry: {
    backgroundColor: "#55E0BB",
    // borderWidth: 1,
    // borderColor: "#474747",
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

export default TransactionForm;
