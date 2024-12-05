// services/auth.js
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebaseConfig"; // Certifique-se de que está importando o app corretamente

const auth = getAuth(app);

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

// Função de login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Retorna o usuário logado
  } catch (error) {
    throw new Error(error.message); // Retorna o erro em caso de falha
  }
};

// Função para logout
export const logout = async () => {
  await signOut(auth);
};
