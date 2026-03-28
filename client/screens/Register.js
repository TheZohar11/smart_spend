import { TextInput, Text, Button, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
export default function Register() {
  function handleOnPress() {
    //TODO: add user data to users collection in db (create user route)
    navigation.navigate("Home");
  }
  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="name" />
      <TextInput placeholder="email" />
      <TextInput placeholder="password" />
      <Button onPress={handleOnPress} title="Register" />
    </View>
  );
}
