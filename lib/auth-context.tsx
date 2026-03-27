import { createContext } from "react";
import { Models } from "react-native-appwrite";

const AuthContext = createContext(undefined);

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
};

// AuthProvider is wrapper component so use {children}: {children:React.ReactNode}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return;
}

export function useAuth() {}
