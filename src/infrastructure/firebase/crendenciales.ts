import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-biXz1u0Aca6_fHuGyAzLDz9I1V_5dTE",
  authDomain: "appelis-510f5.firebaseapp.com",
  projectId: "appelis-510f5",
  storageBucket: "appelis-510f5.appspot.com",
  messagingSenderId: "406973365686",
  appId: "1:406973365686:web:c91cbdf7181a4f2ae11517"
};

// Inicializar Firebase solo si no está ya inicializado
let appFirebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

export { appFirebase, auth, db, storage };
