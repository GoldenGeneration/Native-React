import { KeyboardAvoidingView, Platform, View, Text, TextInput } from "react-native";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <View>
        <Text>Create Account</Text>

      </View>
      <View>
        <TextInput label="Email" />
      </View>
    </KeyboardAvoidingView>
  );
}
