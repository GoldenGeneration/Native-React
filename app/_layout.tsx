import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const {user} = useAuth()

  useEffect(() => {
    setMounted(true); // wait until layout mounts
  }, []);

  useEffect(() => {
    if (mounted && !user && pathname !== "/auth") {
      router.replace("/auth");
    } else if (mounted && user) {
      router.replace("/")
    } {
      
    }
  }, [mounted, user, pathname]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>

    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" />
      </Stack>
    </RouteGuard>
    </AuthProvider>
  );
}