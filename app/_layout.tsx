import { Stack, useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isAuth = false;

  useEffect(() => {
    setMounted(true); // wait until layout mounts
  }, []);

  useEffect(() => {
    if (mounted && !isAuth && pathname !== "/auth") {
      router.replace("/auth");
    }
  }, [mounted, isAuth, pathname]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" />
      </Stack>
    </RouteGuard>
  );
}