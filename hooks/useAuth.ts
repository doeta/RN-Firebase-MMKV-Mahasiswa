import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createMMKV } from "react-native-mmkv";
import { firebaseConfig } from "../FirebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize MMKV
const storage = createMMKV();

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Save to MMKV
      storage.set("uid", uid);

      return { success: true, uid };
    } catch (error: any) {
      let message = "Login gagal";

      if (error.code === "auth/user-not-found") {
        message = "User tidak ditemukan";
      } else if (error.code === "auth/wrong-password") {
        message = "Password salah";
      } else if (error.code === "auth/invalid-email") {
        message = "Email tidak valid";
      } else if (error.code === "auth/invalid-credential") {
        message = "Email atau password salah";
      }

      return { success: false, message };
    }
  };

  const logout = async () => {
    await signOut(auth);
    storage.remove("uid");
  };

  const getCurrentUser = () => {
    return storage.getString("uid");
  };

  return { login, logout, getCurrentUser };
};
