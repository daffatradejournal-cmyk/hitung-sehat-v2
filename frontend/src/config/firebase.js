import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNLzMaRfHp3QuTOo1nyUB_jf3GZv70oVo",
  authDomain: "kalorinai.firebaseapp.com",
  projectId: "kalorinai",
  storageBucket: "kalorinai.firebasestorage.app",
  messagingSenderId: "1090951199888",
  appId: "1:1090951199888:web:5112e717705d6533e1ac15",
  measurementId: "G-8PH547DM24",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
