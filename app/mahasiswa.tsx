import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { db } from "../lib/firebase";
import { storageHelper } from "../lib/storage";

export default function MahasiswaScreen() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[MAHASISWA] Fetching data from Firestore...");

        // Get current user ID from MMKV (synchronous)
        const uid = storageHelper.getString("uid");
        console.log("[MAHASISWA] Current user ID:", uid);

        // Query only data for this user
        const col = collection(db, "mahasiswa");
        const q = query(col, where("userId", "==", uid));
        const snap = await getDocs(q);
        console.log("[MAHASISWA] Documents count:", snap.size);

        const data: any = [];
        snap.forEach((doc) => {
          console.log("[MAHASISWA] Doc ID:", doc.id, "Data:", doc.data());
          data.push({ id: doc.id, ...doc.data() });
        });

        setList(data);
        console.log("[MAHASISWA] Final list:", data);
      } catch (error) {
        console.error("[MAHASISWA] Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Data Mahasiswa</Text>

      {list.length === 0 ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "red" }}>
            Data kosong! Silakan tambahkan data di Firebase Console:
          </Text>
          <Text style={{ marginTop: 10 }}>
            1. Buka console.firebase.google.com
          </Text>
          <Text>2. Pilih project mahasiswaapp-edc50</Text>
          <Text>3. Klik Firestore Database</Text>
          <Text>4. Buat collection "mahasiswa"</Text>
          <Text>5. Tambah document dengan field: nama, nim, jurusan</Text>
        </View>
      ) : (
        list.map((m: any) => (
          <View
            key={m.id}
            style={{
              marginTop: 15,
              padding: 10,
              backgroundColor: "#f0f0f0",
              borderRadius: 5,
            }}
          >
            <Text>Nama: {m.Nama}</Text>
            <Text>NIM: {m.NIM}</Text>
            <Text>Jurusan: {m.Jurusan}</Text>
            {m.Angkatan && <Text>Angkatan: {m.Angkatan}</Text>}
          </View>
        ))
      )}
    </ScrollView>
  );
}
