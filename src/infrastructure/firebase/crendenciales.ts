// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEkN-n37LwECIfumhm5EDuOy2BeNRbbi8",
  authDomain: "loginpeliculas-5a3f4.firebaseapp.com",
  projectId: "loginpeliculas-5a3f4",
  storageBucket: "loginpeliculas-5a3f4.appspot.com",
  messagingSenderId: "412800630371",
  appId: "1:412800630371:web:f0de73ea69935ebc750256"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase