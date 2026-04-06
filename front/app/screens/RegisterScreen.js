import { View, StyleSheet, Text, TextInput } from "react-native";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>email</Text>
      <TextInput style={styles.textInput} placeholder="enter your email" />
      <Text style={styles.text}>password</Text>
      <TextInput style={styles.textInput} placeholder="enter your password" />
      <MyButton text="submit" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#cbd8db",
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: "80%",
    maxWidth: 300,
  },
});
