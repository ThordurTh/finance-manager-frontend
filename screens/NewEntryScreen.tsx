import React, { useState } from "react";
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
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
// import { addTransaction } from './redux/transactionsSlice';

interface TransactionFormProps {}

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

  const dispatch = useDispatch();

  const handleAddTransaction = async () => {
    // console.log("saved");
    // dispatch(addTransaction({ amount, type, date, name, comment, category: selectedCategory }));
    const body = {
      amount: Number(amount),
      date: date,
      currency: "DKK",
      name,
      comment,
      // selectedCategory: selectedCategory.toLowerCase(),
      categoryName: selectedCategory.toLowerCase(),
    };
    try {
      const response = await fetch(
        "https://honestly-grateful-honeybee.ngrok-free.app/entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        // Handle success
        console.log("Transaction added successfully");
        console.log(body);
        // setAmount("");
        // setDate(new Date());
        // setName("");
        // setComment("");
        // setSelectedCategory("");
      } else {
        // Handle error
        console.log(body);
        console.log("Error code: " + response.status);
        console.error("Failed to add transaction");
      }
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

  return (
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
          // textColor="black"
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
      <View style={styles.addEntry}>
        <Button color="#000" title="Add Entry" onPress={handleAddTransaction} />
      </View>
    </View>
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
    borderColor: "#56e2bc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#282828",
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
    borderColor: "#56e2bc",
    borderWidth: 1,
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
    borderWidth: 1,
    borderColor: "#56e2bc",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedRadioButton: {
    backgroundColor: "#56e2bc",
  },
  categoryInput: {
    height: 60,
    width: "100%",
    borderColor: "#56e2bc",
    borderWidth: 1,
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
    backgroundColor: "#56e2bc",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  addEntry: {
    backgroundColor: "#56e2bc",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
});

export default TransactionForm;
