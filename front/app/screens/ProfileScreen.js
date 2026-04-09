import { StyleSheet, View } from "react-native";
import LargeText from "../components/LargeText";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LargeText text="ProfileScreen" />
      <MyButton text="Log out" onPress={() => navigation.navigate("Landing")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
});
