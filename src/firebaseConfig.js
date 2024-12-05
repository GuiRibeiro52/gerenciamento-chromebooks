// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_cbkvuZS0k5M90tgZ68AdIFCn1jZAr3g",
  authDomain: "chromebook-manager-6fd19.firebaseapp.com",
  projectId: "chromebook-manager-6fd19",
  storageBucket: "chromebook-manager-6fd19.firebasestorage.app",
  messagingSenderId: "404220794332",
  appId: "1:404220794332:web:a755ede7f703ca0f016b19",
  measurementId: "G-8D6M3EBRLL",
};

// Inicializar o app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Funções de autenticação
const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const logout = () => signOut(auth);
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Exportando app junto com auth, db e funções auxiliares
export { app, db, auth, login, register, logout, loginWithGoogle };
