import { StyleSheet, TextInput } from "react-native";

export default function MyInput({ placeholder, isSecureEntry }) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      secureTextEntry={!!isSecureEntry}
    />
  );
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: "80%",
    maxWidth: 300,
  },
});
