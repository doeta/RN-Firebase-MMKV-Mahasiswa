import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { auth } from "../lib/firebase";
import { storageHelper } from "../lib/storage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Mohon isi email dan password");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login success:", userCredential.user.uid);
      storageHelper.setString("uid", userCredential.user.uid);
      router.replace("/home");
    } catch (e: any) {
      console.error("Login error:", e);
      let errorMessage = "Login gagal";

      if (e.code === "auth/user-not-found") {
        errorMessage = "User tidak ditemukan";
      } else if (e.code === "auth/wrong-password") {
        errorMessage = "Password salah";
      } else if (e.code === "auth/invalid-email") {
        errorMessage = "Email tidak valid";
      } else if (e.code === "auth/invalid-credential") {
        errorMessage = "Email atau password salah";
      }

      alert(errorMessage + ": " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Login</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginTop: 20, padding: 10 }}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? "Loading..." : "Login"}
        onPress={login}
        disabled={loading}
      />
    </View>
  );
}
