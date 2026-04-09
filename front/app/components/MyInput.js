import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/Theme";

export default function MyInput({
  placeholder,
  isSecureEntry,
  value,
  onChangeText,
}) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      secureTextEntry={!!isSecureEntry}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
    />
  );
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: "80%",
    maxWidth: 300,
  },
});
