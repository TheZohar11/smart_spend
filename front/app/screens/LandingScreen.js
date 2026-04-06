import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyButton";

export default function LandingScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>welcome to landing screen</Text>
      <MyButton
        text="register"
        onPress={() => navigation.navigate("Register")}
      />
      <MyButton text="login" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbd8db",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    margin: 25,
    alignContent: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
