# Mahasiswa App

Tugas kuliah PBP - Implementasi Firebase Authentication, MMKV, dan Firestore untuk aplikasi data mahasiswa.

## Deskripsi Tugas

1. **Firebase Authentication** - Simpan informasi login menggunakan MMKV
2. **Firebase Firestore** - Buat database untuk data mahasiswa
3. **Fetch & Display** - Ambil dan tampilkan data mahasiswa di React Native

## Tech Stack

- React Native (Expo)
- Firebase Authentication & Firestore
- MMKV (persistent storage)
- TypeScript

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Setup Firebase config:

   ```bash
   cp lib/firebase.example.ts lib/firebase.ts
   ```

   Edit `lib/firebase.ts` dengan config Firebase kamu.

3. Run app:
   ```bash
   npx expo start
   ```

## Implementasi

### 1. Firebase Authentication (`app/login.tsx`)

```typescript
// Login dengan email & password
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// Simpan UID ke MMKV storage
storageHelper.setString("uid", userCredential.user.uid);
```

### 2. MMKV untuk Persistent Session (`lib/storage.ts`)

```typescript
// MMKV storage untuk simpan informasi login
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();

export const storageHelper = {
  setString: (key: string, value: string) => {
    storage.set(key, value);
  },
  getString: (key: string) => {
    return storage.getString(key);
  },
  remove: (key: string) => {
    storage.remove(key);
  },
};
```

**Note**: MMKV v4 menggunakan NitroModules. Bisa test di web (auto fallback ke localStorage), atau build native:

```bash
# Test di web
npx expo start --web

# Build development APK
eas build --profile development --platform android
```

### 3. Firebase Firestore Database

**Collection**: `mahasiswa`  
**Fields**: `Nama`, `NIM`, `Jurusan`, `Angkatan`, `userId`

Setiap user punya data mahasiswa sendiri berdasarkan field `userId`.

### 4. Fetch & Display Data (`app/mahasiswa.tsx`)

```typescript
// Fetch hanya data mahasiswa milik user yang login
const uid = storageHelper.getString("uid"); // Synchronous
const q = query(collection(db, "mahasiswa"), where("userId", "==", uid));
const snap = await getDocs(q);

// Tampilkan data di ScrollView
snap.forEach((doc) => {
  const data = doc.data(); // { Nama, NIM, Jurusan, Angkatan, ... }
});
```

## Struktur File

```
app/
├── index.tsx        # Cek auth, redirect ke login/home
├── login.tsx        # Form login + Firebase Auth
├── home.tsx         # Home screen dengan tombol logout
└── mahasiswa.tsx    # Fetch & display data dari Firestore
lib/
├── firebase.ts      # Init Firebase (Auth + Firestore)
└── storage.ts       # MMKV storage helper
```
