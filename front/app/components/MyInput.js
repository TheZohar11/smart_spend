import { StyleSheet, TextInput } from "react-native";

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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: "80%",
    maxWidth: 300,
  },
});
