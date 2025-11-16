import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { storageHelper } from "../lib/storage";

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check authentication status
    try {
      console.log("[INDEX] Checking auth status...");
      const uid = storageHelper.getString("uid");
      console.log("[INDEX] UID from storage:", uid);

      // Small delay to ensure router is ready
      setTimeout(() => {
        if (uid) {
          console.log("[INDEX] Redirecting to /home");
          router.replace("/home");
        } else {
          console.log("[INDEX] Redirecting to /login");
          router.replace("/login");
        }
        setIsReady(true);
      }, 100);
    } catch (error) {
      console.error("[INDEX] Error checking auth:", error);
      router.replace("/login");
      setIsReady(true);
    }
  }, []);

  // Show loading screen while checking auth
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
