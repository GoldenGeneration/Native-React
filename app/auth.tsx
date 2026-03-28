import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUP] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");

  const router = useRouter();
  const theme = useTheme();

  const { signIn, signUp } = useAuth();

  const handleSwitchMode = () => {
    setIsSignUP((prev) => !prev);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please insert all your credentials");
      return;
    }

    if (password.length < 6) {
      setError("Password must be atleast 6 character long");
      return;
    }

    setError(null);

    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
      router.replace("/");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create Account" : "Welcome back"}
        </Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          placeholder="email@gmail.com"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          placeholder="Your Password"
          secureTextEntry
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        <Button style={styles.button} mode="contained" onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Log In"}
        </Button>
        <Button
          style={styles.switchButton}
          mode="text"
          onPress={handleSwitchMode}
        >
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
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchButton: {
    marginTop: 16,
  },
});
