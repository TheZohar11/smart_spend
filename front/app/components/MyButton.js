import { Pressable, View, Text, StyleSheet } from "react-native";

export default function MyButton({ text, onPress, color }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={[styles.buttonText, { color: color ? color : "#111" }]}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "rgb(228, 143, 216)",
    margin: 20,
    padding: 20,
    width: 150,
    alignSelf: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
