import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUP] = useState(false);

  const handleSwitchMode = () => {
    setIsSignUP((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">{isSignUp ? "Create Account" : "Welcome back"}</Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          placeholder="email@gmail.com"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          />
        <TextInput
          label="Password"
          autoCapitalize="none"
          placeholder="Your Password"
          mode="outlined"
          style={styles.input}
        />
        <Button style={styles.button} mode="contained">{isSignUp ? "Sign Up" : "Log In"}</Button>
        <Button style={styles.switchButton} mode="text" onPress={handleSwitchMode}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    marginBottom: 24
  },
  input: {
    marginBottom: 16
  },
  button: {
    marginTop: 8
  },
  switchButton: {
    marginTop: 16
  }
});
