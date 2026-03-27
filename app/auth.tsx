import { KeyboardAvoidingView, Platform, View, Text, TextInput } from "react-native";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <View>
        <Text>Create Account</Text>
        <TextInput autoCapitalize="none" placeholder="email@gmail.com" keyboardType="email-address" />
      </View>
    </KeyboardAvoidingView>
  );
}
