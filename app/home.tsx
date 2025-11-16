import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { storageHelper } from "../lib/storage";

export default function HomeScreen() {
  const router = useRouter();
  const [uid, setUid] = useState<string | undefined>();

  useEffect(() => {
    const userId = storageHelper.getString("uid");
    setUid(userId);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Welcome!</Text>
      <Text>User ID: {uid}</Text>

      <Button
        title="Lihat Data Mahasiswa"
        onPress={() => router.push("/mahasiswa")}
      />

      <Button
        title="Logout"
        color="red"
        onPress={() => {
          storageHelper.remove("uid");
          router.replace("/login");
        }}
      />
    </View>
  );
}
