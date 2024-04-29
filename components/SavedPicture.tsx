import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";

export default function SavedPicture() {
  const [imageUri, setImageUri] = useState<string | null>(null); // Explicit type specification

  useEffect(() => {
    // Load the saved image when the component mounts
    loadSavedImage();
  }, []);

  async function loadSavedImage() {
    try {
      // Retrieve the saved image URI from the cache directory
      const savedImageUri = `${FileSystem.cacheDirectory}photo.jpg`;
      // Check if the image exists
      const fileInfo = await FileSystem.getInfoAsync(savedImageUri);
      console.log(fileInfo);
      //   console.log("File size:", fileInfo.size);
      //   console.log("savedImageUri is: " + savedImageUri);
      //   console.log("FileSystem.cacheDirectory is: " + FileSystem.cacheDirectory);
      if (fileInfo.exists) {
        // Set the image URI to display the image
        setImageUri(savedImageUri);
      }
    } catch (error) {
      console.error("Error loading saved image:", error);
    }
  }

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
