import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { user, isLoadingUser } = useAuth();

  useEffect(() => {
    setMounted(true); // wait until layout mounts
  }, []);

  useEffect(() => {
    if (mounted && !user && pathname !== "/auth" && !isLoadingUser) {
      router.replace("/auth");
    } else if (mounted && user && pathname == "/auth" && !isLoadingUser) {
      router.replace("/");
    }
  }, [mounted, user, pathname]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
