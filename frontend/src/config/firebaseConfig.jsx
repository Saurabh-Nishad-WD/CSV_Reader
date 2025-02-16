import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, ref } from "firebase/database";

// Firebase Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  appId: import.meta.env.VITE_APP_ID,
};

// ✅ Initialize Firebase (No async needed)
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Realtime Database
const firestore = getFirestore(app); // Firestore Database

// ✅ Create Firebase Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  
  // ✅ Asynchronous function to store data in Firebase Realtime Database
  const putData = async (key, data) => {
    try {
      await set(ref(db, key), data);
      console.log("Data successfully saved!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ putData }}>
      {children}
    </FirebaseContext.Provider>
  );
};
