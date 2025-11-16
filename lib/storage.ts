import { createMMKV } from "react-native-mmkv";

// Initialize MMKV instance
export const storage = createMMKV();

// Type-safe storage helpers
export const storageHelper = {
  // String operations
  setString: (key: string, value: string) => {
    storage.set(key, value);
  },

  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  // Boolean operations
  setBoolean: (key: string, value: boolean) => {
    storage.set(key, value);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  // Number operations
  setNumber: (key: string, value: number) => {
    storage.set(key, value);
  },

  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  // Object operations (JSON)
  setObject: (key: string, value: object) => {
    storage.set(key, JSON.stringify(value));
  },

  getObject: <T = any>(key: string): T | undefined => {
    try {
      const jsonString = storage.getString(key);
      return jsonString ? JSON.parse(jsonString) : undefined;
    } catch (error) {
      console.error("Error parsing JSON from storage:", error);
      return undefined;
    }
  },

  // Delete operation
  remove: (key: string) => {
    storage.remove(key);
  },

  // Check if key exists
  contains: (key: string): boolean => {
    return storage.contains(key);
  },

  // Clear all data
  clearAll: () => {
    storage.clearAll();
  },

  // Get all keys
  getAllKeys: (): string[] => {
    return storage.getAllKeys();
  },
};
