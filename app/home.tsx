import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const router = useRouter();
  const { getCurrentUser, logout } = useAuth();
  const [uid, setUid] = useState<string | undefined>();

  useEffect(() => {
    const userId = getCurrentUser();
    setUid(userId);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Selamat Datang! 👋</Text>
          <Text style={styles.userId}>User ID: {uid?.substring(0, 8)}...</Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/mahasiswa")}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.iconText}>📚</Text>
            </View>
            <Text style={styles.cardTitle}>Data Mahasiswa</Text>
            <Text style={styles.cardSubtitle}>Lihat daftar mahasiswa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.logoutCard]}
            onPress={handleLogout}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.iconText}>🚪</Text>
            </View>
            <Text style={styles.cardTitle}>Logout</Text>
            <Text style={styles.cardSubtitle}>Keluar dari akun</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  welcome: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  userId: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  cardContainer: {
    flex: 1,
    gap: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  logoutCard: {
    backgroundColor: "#fff",
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  iconText: {
    fontSize: 30,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
