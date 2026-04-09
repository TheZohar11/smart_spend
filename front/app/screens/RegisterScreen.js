import { View, StyleSheet, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyButton";
import MediumText from "../components/MediumText";
import MyInput from "../components/MyInput";

export default function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <MediumText text="email" />
      <MyInput placeholder="enter your email" />
      <MediumText text="password" />
      <MyInput placeholder="enter your password" isSecureEntry={true} />
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
});
