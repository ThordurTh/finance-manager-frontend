import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
export const ModalContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const navigation = useNavigation();

  const navigateToPreviousTab = () => {
    navigation.goBack();
    onClose(); // Close the modal
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeading}>
          Sorry, you don't have admin privileges
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={navigateToPreviousTab}>
            <View style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Go back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    // paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    width: "80%",
    height: 160,
    backgroundColor: "#39413F",
  },
  modalHeading: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "column",
    // justifyContent: "flex-end",
    marginTop: "auto",
    gap: 10,
    width: "90%",
    justifyContent: "center",
  },
  modalButton: {
    backgroundColor: "#55E0BB",
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
  },
});
