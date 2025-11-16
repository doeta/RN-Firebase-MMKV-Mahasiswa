import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function Index() {
  const router = useRouter();
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    const uid = getCurrentUser();

    setTimeout(() => {
      if (uid) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }, 100);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#667eea",
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
