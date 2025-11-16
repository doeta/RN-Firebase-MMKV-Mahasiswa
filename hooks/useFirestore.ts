import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../FirebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const useFirestore = () => {
  const getMahasiswaByUser = async (userId: string) => {
    try {
      const q = query(
        collection(db, "mahasiswa"),
        where("userId", "==", userId)
      );
      const snap = await getDocs(q);

      const data: any[] = [];
      snap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, data };
    } catch (error) {
      console.error("[FIRESTORE] Error:", error);
      return { success: false, data: [] };
    }
  };

  return { getMahasiswaByUser };
};
