import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-biXz1u0Aca6_fHuGyAzLDz9I1V_5dTE",
  authDomain: "appelis-510f5.firebaseapp.com",
  projectId: "appelis-510f5",
  storageBucket: "appelis-510f5.appspot.com",
  messagingSenderId: "406973365686",
  appId: "1:406973365686:web:c91cbdf7181a4f2ae11517"
};

// Asegúrate de que Firebase solo se inicializa una vez
const appFirebase = initializeApp(firebaseConfig);

// Exporta instancias de Auth y Firestore
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export { appFirebase, auth, db };
