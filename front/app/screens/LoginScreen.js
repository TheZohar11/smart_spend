import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import MyButton from "../components/MyButton";
import MediumText from "../components/MediumText";
import MyInput from "../components/MyInput";
import { Colors } from "../constants/Theme";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (password !== confirmPassword) {
      alert("password and conform password has to match");
    } else {
      try {
        //TODO: send HTTP req with axios to create user route
        navigation.navigate("Home");
      } catch (error) {
        console.error("error- ", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <MediumText text="email" />
      <MyInput
        placeholder="enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <MediumText text="password" />
      <MyInput
        placeholder="enter your password"
        isSecureEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <MyButton text="submit" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.whiteBackground,
  },
});
