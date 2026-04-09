import { View, Text, StyleSheet } from "react-native";
export default function LargeText({ text, color }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: color ? color : "#777" }]}>
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
