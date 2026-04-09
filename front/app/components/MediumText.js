import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/Theme";

export default function MediumText({ text }) {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    color: Colors.black,
  },
});
