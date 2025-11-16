# Mahasiswa App

Tugas PBP: Firebase Authentication + MMKV + Firestore untuk data mahasiswa.

## Ringkasan Fitur

- Login dengan Firebase Auth, session disimpan di MMKV (sync, cepat)
- Data mahasiswa per-user di Firestore (filter by `userId`)
- UI modern (gradient header, card list)

## Tech Stack

- Expo (React Native, TypeScript)
- Firebase Auth & Firestore
- MMKV v4 (react-native-mmkv)

## Setup

1. Install dependencies

```bash
npm install
```

2. Buat file `FirebaseConfig.js` di root proyek (bukan di `lib/`):

```js
// FirebaseConfig.js
export const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT>.firebaseapp.com",
  projectId: "<PROJECT>",
  storageBucket: "<PROJECT>.firebasestorage.app",
  messagingSenderId: "<SENDER_ID>",
  appId: "<APP_ID>",
};
```

3. Jalankan app

```bash
npx expo start
```

Opsional:

```bash
# Web dev
npx expo start --web

# APK dev (butuh EAS)
eas build --profile development --platform android
```

## Implementasi (Modular Hooks)

### Auth + MMKV (`hooks/useAuth.ts`)

```ts
import { createMMKV } from "react-native-mmkv";
const storage = createMMKV();

// Simpan UID saat login
storage.set("uid", uid);

// Ambil UID saat app dibuka
storage.getString("uid");

// Logout (MMKV v4 → gunakan remove)
storage.remove("uid");
```

### Firestore (`hooks/useFirestore.ts`)

```ts
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";

// Contoh query per-user
const q = query(collection(db, "mahasiswa"), where("userId", "==", uid));
const snap = await getDocs(q);
```

### Tampilan Data (`app/mahasiswa.tsx`)

List card dengan avatar inisial, badge NIM, dan detail Jurusan/Angkatan.

## Struktur Proyek (aktual)

```
app/
  index.tsx       # Cek UID → redirect login/home
  login.tsx       # Form login + UI
  home.tsx        # Welcome + tombol ke Mahasiswa + Logout
  mahasiswa.tsx   # List data per-user
hooks/
  useAuth.ts      # Auth + MMKV
  useFirestore.ts # Query Firestore
FirebaseConfig.js
```
