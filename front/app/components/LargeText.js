import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Theme";

export default function LargeText({ text, color }) {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, { color: color ? color : Colors.SecondaryText }]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
  },
});
