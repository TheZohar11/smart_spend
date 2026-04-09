import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Theme";

export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text>welcome to home screen</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.softBlue,
  },
});
