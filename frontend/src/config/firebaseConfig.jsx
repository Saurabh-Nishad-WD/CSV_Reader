import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Real-time Database
const firestore = getFirestore(app); // Firestore Database

// Create Firebase Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  
  // Function to store data in Firebase Realtime Database
  const putData = (key, data) => set(ref(db, key), data);

  return (
    <FirebaseContext.Provider value={{ putData }}>
      {children}
    </FirebaseContext.Provider>
  );
};
